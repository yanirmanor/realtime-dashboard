# Realtime Dashboard

## Run modes

- Real server mode (default): runs client + socket server.
- Mock mode: runs client only and generates stream events in-browser.

## Commands

```bash
# real mode (client + server)
bun run dev

# client only with mock stream
VITE_SOCKET_MODE=mock bun run dev:client
```

When `VITE_SOCKET_MODE=mock`, the client skips the backend socket server and emits `metric:event` locally.
