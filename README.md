# Axiom Pulse — Token Table
Install deps and run:
```bash
pnpm install
pnpm dev:all
```
Open http://localhost:3000/tokens



# Axiom Pulse – Token Trading Table (Next.js 14)

Pixel-accurate token discovery table with live price updates.

## Tech
- Next.js 14 (App Router), TypeScript (strict), Tailwind
- Redux Toolkit + React Query
- Radix UI (Tooltip/Popover/Dialog)
- Mock REST API + WebSocket server

## Run (dev)
pnpm install
pnpm dev:all  # Next on :3000, WS on :8787

## Run (prod)
pnpm build
pnpm start:all

## Route
http://localhost:3000/tokens

## Notes
- Live price flashes on update (green/red)
- Sorting (price, 24h, volume, mkt cap)
- Tabs: new / final / migrated
