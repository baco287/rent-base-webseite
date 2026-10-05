import type { NextConfig } from "next";

// Reine Marketing-Website ohne Datenbank und ohne Server-Logik. Läuft getrennt von der App (app.rent-base.de).
// Statischer Export: `next build` erzeugt fertige Dateien in out/, die nginx ausliefert (siehe Dockerfile).
// Bilder liegen bereits als WebP in passender Größe vor; eine Optimierung zur Laufzeit gibt es ohne Server nicht.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
