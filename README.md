# Telecom UI (demonstrating basic functionality for learning purposes)

Lightweight React-admin UI for Telecom-API services

## Requirements

- Node.js 18+ (use the project Node version manager if available)
- npm (or yarn/pnpm)

## Quick start

1. Install dependencies

```sh
npm ci
```

2. Run in development mode (Vite)

```sh
npm run dev
# open http://localhost:5173
```

3. Build for production

```sh
npm run build
# output goes to dist/
```

4. Serve production build with a static server or Docker + nginx.

## Configuration

The app reads these environment variables at build/runtime:

- VITE_JSON_SERVER_URL — backend URL used by the built-in data provider (default: JSONPlaceholder)
- VITE_ROUTEAPI_URL — URL of your RouteAPI (used for runtime calls like /version)
- VITE_APP_VERSION — optional build/version string you can set in CI

Create a `.env` file at the project root or export variables in your CI pipeline:

```

```
