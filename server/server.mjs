// Kleiner Node-Server für rent-base.de. Er ersetzt nginx und erledigt zwei Dinge:
//   1. den statischen Next.js-Export (out/) ausliefern, mit denselben Sicherheits- und Cache-Headern wie vorher
//   2. Anfragen aus dem Formular „Kostenlos testen“ annehmen und per E-Mail an info@rent-base.de weiterleiten
//
// Datenschutz (siehe Datenschutzerklärung): kein Zugriffsprotokoll, keine Speicherung der Anfragen auf dem Server.
// Für die Begrenzung von Massenanfragen werden IP-Adressen nur gehasht und höchstens eine Stunde im Arbeitsspeicher gehalten.
//
// Umgebungsvariablen (in Coolify setzen):
//   SMTP_HOST, SMTP_PORT (Standard 587, STARTTLS), SMTP_USER, SMTP_PASS   Postfach, über das die Anfragen verschickt werden
//   MAIL_TO (Standard info@rent-base.de), MAIL_FROM (Standard SMTP_USER, wenn das eine Adresse ist, sonst MAIL_TO)
// Ohne SMTP_HOST antwortet das Formular mit 503 und zeigt E-Mail und WhatsApp als Ausweg. SMTP_HOST=test verschickt nichts.

import http from "node:http";
import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
import nodemailer from "nodemailer";

const ROOT = path.resolve(process.env.SITE_ROOT ?? "out");
const PORT = Number(process.env.PORT ?? 80);
const MAIL_TO = process.env.MAIL_TO ?? "info@rent-base.de";
// Absender: MAIL_FROM, sonst SMTP_USER, falls das eine Adresse ist. Bei ALL-INKL ist SMTP_USER oft eine Kennung (m0…).
const MAIL_FROM = process.env.MAIL_FROM || (process.env.SMTP_USER?.includes("@") ? process.env.SMTP_USER : MAIL_TO);
const SMTP_HOST = process.env.SMTP_HOST ?? "";
// Hetzner sperrt ausgehenden Port 465 (und 25), deshalb 587 mit STARTTLS als Standard.
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".webmanifest": "application/manifest+json",
};
const COMPRESSIBLE = new Set([".html", ".css", ".js", ".json", ".txt", ".xml", ".svg", ".webmanifest"]);

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

/* ---------- statische Dateien ---------- */

const gzCache = new Map(); // Pfad -> { mtime, buf }

async function findFile(urlPath) {
  let p;
  try {
    p = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  const rel = path.normalize(p).replace(/^([/\\])+/, "");
  const base = path.join(ROOT, rel);
  if (!base.startsWith(ROOT)) return null;
  // /impressum -> impressum.html, / -> index.html, Ordner -> index.html
  for (const candidate of [base, `${base}.html`, path.join(base, "index.html")]) {
    try {
      const s = await stat(candidate);
      if (s.isFile()) return { file: candidate, mtime: s.mtimeMs };
    } catch {
      /* nächster Kandidat */
    }
  }
  return null;
}

function cacheControl(urlPath, ext) {
  if (urlPath.startsWith("/_next/static/")) return "public, max-age=31536000, immutable";
  if ([".webp", ".png", ".jpg", ".svg", ".pdf", ".ico", ".woff2", ".woff"].includes(ext)) return "public, max-age=604800";
  return "no-cache";
}

async function serveStatic(req, res, urlPath) {
  let found = await findFile(urlPath);
  // Next.js lädt Seitendaten vorab als „/agb/__next.agb.__PAGE__.txt“, der Export legt sie aber unter
  // „/agb/__next.agb/__PAGE__.txt“ ab. Punkte nach dem ersten Segment entsprechen dort Ordnern.
  const rsc = !found && urlPath.match(/^(.*\/)__next\.([^/]+)\.txt$/);
  if (rsc) {
    const [first, ...rest] = rsc[2].split(".");
    if (rest.length) found = await findFile(`${rsc[1]}__next.${first}/${rest.join("/")}.txt`);
  }
  let status = 200;
  if (!found) {
    found = await findFile("/404.html");
    status = 404;
    if (!found) return send(res, 404, { "Content-Type": "text/plain; charset=utf-8" }, "Nicht gefunden");
  }
  const ext = path.extname(found.file).toLowerCase();
  const headers = { "Content-Type": MIME[ext] ?? "application/octet-stream", "Cache-Control": status === 404 ? "no-cache" : cacheControl(urlPath, ext) };
  let body = await readFile(found.file);
  if (COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
    const hit = gzCache.get(found.file);
    if (hit && hit.mtime === found.mtime) body = hit.buf;
    else {
      const buf = gzipSync(body, { level: 6 });
      gzCache.set(found.file, { mtime: found.mtime, buf });
      body = buf;
    }
    headers["Content-Encoding"] = "gzip";
  }
  if (COMPRESSIBLE.has(ext)) headers["Vary"] = "Accept-Encoding";
  send(res, status, headers, req.method === "HEAD" ? null : body, body.length);
}

function send(res, status, headers, body, length) {
  res.writeHead(status, { ...SECURITY_HEADERS, ...headers, ...(length !== undefined ? { "Content-Length": length } : {}) });
  res.end(body ?? undefined);
}

function json(res, status, data) {
  const body = JSON.stringify(data);
  send(res, status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, body, Buffer.byteLength(body));
}

/* ---------- Anfrageformular ---------- */

const RATE_LIMIT = 5; // Anfragen je Stunde und Absender
const hits = new Map(); // gehashte IP -> Zeitpunkte

function rateLimited(req) {
  const ip = String(req.headers["x-forwarded-for"] ?? "").split(",")[0].trim() || req.socket.remoteAddress || "";
  const key = createHash("sha256").update(ip).digest("hex").slice(0, 16);
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 3_600_000);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > RATE_LIMIT;
}
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of hits) if (v.every((t) => now - t >= 3_600_000)) hits.delete(k);
}, 600_000).unref();

const transport = !SMTP_HOST
  ? null
  : SMTP_HOST === "test"
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        requireTLS: SMTP_PORT !== 465, // 587: STARTTLS ist Pflicht, kein Klartext-Login
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        // kurze Grenzen: Besucher sollen nicht minutenlang warten, sondern schnell den Ausweg sehen
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 20_000,
      });

const clean = (v, max) => String(v ?? "").replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "").trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/\s+/g, " ");

function readBody(req, limit = 10_000) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error("zu_gross"));
        req.destroy();
      } else chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function handleInquiry(req, res) {
  // nur Anfragen von der eigenen Seite
  const origin = req.headers.origin;
  if (origin && !/^https?:\/\/(www\.)?rent-base\.de$|^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return json(res, 403, { error: "herkunft" });
  if (!String(req.headers["content-type"] ?? "").startsWith("application/json")) return json(res, 415, { error: "format" });

  let data;
  try {
    data = JSON.parse(await readBody(req));
  } catch {
    return json(res, 400, { error: "format" });
  }

  // Honigtopf-Feld und Mindestzeit: Bots füllen alles sofort aus. Antwort wie bei Erfolg, damit sie nichts lernen.
  if (clean(data.website, 200) || Number(data.elapsed) < 2500) return json(res, 200, { ok: true });
  if (rateLimited(req)) return json(res, 429, { error: "zu_viele" });

  const f = {
    name: oneLine(data.name, 120),
    firma: oneLine(data.firma, 160),
    email: oneLine(data.email, 200),
    telefon: oneLine(data.telefon, 60),
    fahrzeuge: oneLine(data.fahrzeuge, 20),
    nachricht: clean(data.nachricht, 3000),
  };
  if (!f.name || !f.firma || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) return json(res, 422, { error: "pflichtfelder" });
  if (!transport) return json(res, 503, { error: "nicht_konfiguriert" });

  const text = [
    "Neue Anfrage über rent-base.de (Kostenlos testen)",
    "",
    `Name:       ${f.name}`,
    `Firma:      ${f.firma}`,
    `E-Mail:     ${f.email}`,
    `Telefon:    ${f.telefon || "–"}`,
    `Fahrzeuge:  ${f.fahrzeuge || "–"}`,
    "",
    "Nachricht:",
    f.nachricht || "–",
    "",
    "Antworten geht direkt an den Absender (Antwort-an).",
  ].join("\n");

  try {
    await transport.sendMail({
      from: { name: "RentBase Website", address: MAIL_FROM },
      to: MAIL_TO,
      replyTo: { name: f.name, address: f.email },
      subject: `Testzugang angefragt: ${f.firma}${f.fahrzeuge ? ` (${f.fahrzeuge} Fahrzeuge)` : ""}`,
      text,
    });
    if (SMTP_HOST === "test") console.log("Testmodus: Anfrage angenommen, nichts versendet");
    return json(res, 200, { ok: true });
  } catch (e) {
    // keine Formularinhalte ins Protokoll
    console.error("Versand der Anfrage fehlgeschlagen:", e?.code ?? e?.message ?? "unbekannt");
    return json(res, 502, { error: "versand" });
  }
}

/* ---------- Server ---------- */

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    if (url.pathname === "/api/anfrage") {
      if (req.method !== "POST") return send(res, 405, { Allow: "POST" }, null);
      return await handleInquiry(req, res);
    }
    if (req.method !== "GET" && req.method !== "HEAD") return send(res, 405, { Allow: "GET, HEAD" }, null);
    return await serveStatic(req, res, url.pathname);
  } catch (e) {
    console.error("Serverfehler:", e?.message ?? e);
    if (!res.headersSent) send(res, 500, { "Content-Type": "text/plain; charset=utf-8" }, "Serverfehler");
  }
});

server.listen(PORT, () => console.log(`rent-base.de läuft auf Port ${PORT}, Formularversand: ${transport ? (SMTP_HOST === "test" ? "Testmodus" : "aktiv") : "nicht eingerichtet"}`));
for (const sig of ["SIGTERM", "SIGINT"]) process.on(sig, () => server.close(() => process.exit(0)));
