# Realtime Dashboard

Realtime claim-operations dashboard with live event streaming, charts, filtering, and detail drill-down.

## Project structure

```text
.
├── client/   # React app (dashboard UI, state, tests)
└── server/   # Socket.IO event stream server
```

## Prerequisites

- Bun installed (`bun --version`)

## Getting started

Install dependencies from the repo root:

```bash
bun install
```

## Run modes

### 1) Real mode (default)

Runs client and socket server together.

```bash
bun run dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:4000`

### 2) Mock mode (client-only)

Runs only the client and generates events in-browser (no backend needed).

```bash
VITE_SOCKET_MODE=mock bun run dev:client
```

- The UI shows a `Mock mode active` status banner.
- Start/Stop controls still work and pause/resume generated events.

## Screenshots

### Desktop live dashboard

![Desktop live dashboard](docs/screenshots/dashboard-desktop-live.png)

### Mobile responsive layout

![Mobile responsive layout](docs/screenshots/dashboard-mobile-responsive.png)

### Paused state and status filtering

![Paused state and status filtering](docs/screenshots/dashboard-paused-filtered.png)

## Available scripts

From repo root:

- `bun run dev` - start client and server
- `bun run dev:client` - start client only
- `bun run dev:server` - start server only
- `bun run test` - run client test suite
- `bun run test:watch` - watch tests
- `bun run test:coverage` - coverage run
- `bun run lint` - lint client and server
- `bun run lint:fix` - lint + auto-fix
- `bun run fmt` - format client and server
- `bun run fmt:check` - format check

Client-only scripts are in `client/package.json`, server-only scripts are in `server/package.json`.

## Live stream event model

Dashboard consumes `metric:event` messages with this shape:

- `id`, `timestamp`, `claimId`
- `eventType`: `claim_created | document_processed | ai_decision | fraud_alert | workflow_failed`
- `agentName`
- `status`: `processing | approved | rejected | fraud_review | failed`
- `category`: `health | car | home | travel`
- `durationMs`, `confidenceScore`

Control events:

- Client emits: `stream:start`, `stream:stop`
- Server/mock emits: `stream:status` (`{ isStreaming: boolean }`)

## Environment variables

Client (`Vite`) supports:

- `VITE_SOCKET_MODE=real|mock`
  - `real` (default): connect to Socket.IO server on `http://localhost:4000`
  - `mock`: use in-browser generated stream and skip backend dependency

## Troubleshooting

- Seeing `Live stream disconnected` in real mode:
  - ensure `bun run dev` is running, or start `bun run dev:server` in parallel with client
- CORS/connect issues in real mode:
  - server currently allows origin `http://localhost:5173`; if client port/origin changes, update `server/src/index.ts`
- Want to work offline or demo quickly:
  - use `VITE_SOCKET_MODE=mock bun run dev:client`

## Notes

- The server emits a new event every second while streaming is enabled.
- The client keeps the latest 100 events in memory.
