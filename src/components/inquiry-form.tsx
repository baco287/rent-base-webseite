"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { SITE, TRIAL, WHATSAPP } from "@/content/site";
import { WhatsAppLink } from "./ui/whatsapp";

// Anfrage „Kostenlos testen“. Versand über den eigenen Server (server/server.mjs → /api/anfrage → E-Mail an info@rent-base.de).
// Klappt der Versand nicht, bekommt der Besucher E-Mail und WhatsApp als Ausweg angeboten; es geht keine Anfrage verloren.

type State = "idle" | "sending" | "ok" | "error";

const FLEET = ["1–5", "6–10", "11–50", "51–100", "über 100"];

const input =
  "mt-1.5 block w-full rounded-md border border-line-strong bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-3/70 transition-colors focus:border-gold-500 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-gold-300/50";
const label = "block text-sm font-medium text-ink";

export function InquiryForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const started = useRef(0);
  const okRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    started.current = Date.now();
  }, []);
  useEffect(() => {
    if (state === "ok") okRef.current?.focus();
  }, [state]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/anfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - started.current }),
      });
      if (res.ok) {
        setState("ok");
        form.reset();
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setError(
        body.error === "pflichtfelder"
          ? "Bitte Name, Firma und eine gültige E-Mail-Adresse angeben."
          : body.error === "zu_viele"
            ? "Es wurden gerade viele Anfragen gesendet. Bitte versuche es später noch einmal oder schreib uns direkt."
            : "Die Anfrage konnte gerade nicht gesendet werden. Schreib uns bitte direkt per E-Mail oder WhatsApp.",
      );
      setState("error");
    } catch {
      setError("Die Anfrage konnte gerade nicht gesendet werden. Schreib uns bitte direkt per E-Mail oder WhatsApp.");
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div ref={okRef} tabIndex={-1} role="status" className="rounded-lg bg-white p-8 text-center text-ink outline-none sm:p-10">
        <CheckCircle2 aria-hidden className="mx-auto size-10 text-success" strokeWidth={1.6} />
        <h3 className="display mt-4 text-[2rem]">Danke für deine Anfrage.</h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-2">
          Wir melden uns persönlich bei dir und richten deinen Testzugang ein. Eilig? Schreib uns direkt per WhatsApp.
        </p>
        <div className="mt-6 flex justify-center">
          <WhatsAppLink variant="md" className="border-line-strong text-ink hover:bg-surface" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] sm:p-8" aria-describedby="anfrage-hinweis">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={label}>Name</label>
          <input id="f-name" name="name" required maxLength={120} autoComplete="name" className={input} />
        </div>
        <div>
          <label htmlFor="f-firma" className={label}>Firma</label>
          <input id="f-firma" name="firma" required maxLength={160} autoComplete="organization" className={input} />
        </div>
        <div>
          <label htmlFor="f-email" className={label}>E-Mail</label>
          <input id="f-email" name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" className={input} />
        </div>
        <div>
          <label htmlFor="f-telefon" className={label}>
            Telefon <span className="font-normal text-ink-3">(optional)</span>
          </label>
          <input id="f-telefon" name="telefon" type="tel" maxLength={60} autoComplete="tel" inputMode="tel" className={input} />
        </div>
        <div className="sm:col-span-2">
          <span className={label} id="f-fahrzeuge-label">Wie viele Fahrzeuge hast du?</span>
          <div role="radiogroup" aria-labelledby="f-fahrzeuge-label" className="mt-2 flex flex-wrap gap-2">
            {FLEET.map((f) => (
              <label key={f} className="cursor-pointer">
                <input type="radio" name="fahrzeuge" value={f} className="peer sr-only" />
                <span className="inline-flex h-10 items-center rounded-md border border-line-strong px-4 text-sm text-ink-2 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-gold-300 hover:border-ink-3">
                  {f}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="f-nachricht" className={label}>
            Nachricht <span className="font-normal text-ink-3">(optional)</span>
          </label>
          <textarea id="f-nachricht" name="nachricht" rows={3} maxLength={3000} placeholder="z. B. was du heute nutzt oder was dir wichtig ist" className={`${input} resize-y`} />
        </div>
        {/* Honigtopf für Bots, für Menschen unsichtbar */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {state === "error" && (
        <div role="alert" className="mt-5 rounded-md border border-error/30 bg-error-soft px-4 py-3 text-sm text-ink">
          {error}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <a href={TRIAL.mailHref} className="font-medium underline decoration-gold-300 underline-offset-4">{SITE.contactEmail}</a>
            <a href={WHATSAPP.href} target="_blank" rel="noopener noreferrer" className="font-medium underline decoration-[#25D366]/50 underline-offset-4">WhatsApp {WHATSAPP.display}</a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="group mt-6 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#262c31] disabled:cursor-wait disabled:opacity-70"
      >
        {state === "sending" ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" /> Wird gesendet …
          </>
        ) : (
          <>
            Testzugang anfragen <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      <p id="anfrage-hinweis" className="mt-4 text-xs leading-relaxed text-ink-3">
        Kostenlos und unverbindlich. Wir verwenden deine Angaben nur, um deine Anfrage zu beantworten. Mehr dazu in der{" "}
        <Link href="/datenschutz" className="underline decoration-gold-300 underline-offset-2 hover:text-ink">Datenschutzerklärung</Link>.
      </p>
    </form>
  );
}
