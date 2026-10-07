# RentBase-Website: statischer Export mit Next.js, ausgeliefert von einem kleinen Node-Server (server/server.mjs),
# der zusätzlich das Anfrageformular per E-Mail weiterleitet. SMTP-Zugang über Umgebungsvariablen in Coolify.

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS server-deps
WORKDIR /srv
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

FROM node:22-alpine
ENV NODE_ENV=production PORT=80 SITE_ROOT=/srv/out
WORKDIR /srv
COPY --from=server-deps /srv/node_modules ./node_modules
COPY server/package.json server/server.mjs ./
COPY --from=build /app/out ./out
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
CMD ["node", "server.mjs"]
