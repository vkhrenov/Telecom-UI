# Telecom UI (demonstrating basic functionality for learning purposes)

Lightweight React-admin UI for Telecom-API services https://github.com/vkhrenov/Telecom-API

This project is built using the react-admin framework — see https://marmelab.com/react-admin for details, docs and examples. react-admin provides UI components and data provider patterns used throughout this app.

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
VITE_ROUTEAPI_URL=http://localhost:8180
VITE_APP_VERSION=dev-local
```

## Version badge

The UI can display both the frontend build version (VITE_APP_VERSION) and a runtime API version fetched from the Telecom-API root or `/version`. For CI, write VITE_APP_VERSION into `.env` or inject it during the build.

## Docker notes

- For development containers: do not mount host `node_modules` into an Alpine-based container.
- For production: use a multi-stage Dockerfile that builds with Node and copies `dist/` into an nginx image.

## Troubleshooting

- `vite` fails with rollup native binary errors: remove host `node_modules` and `package-lock.json`, then run `npm ci --no-optional` inside the container or use a non‑Alpine build base.
- Dev server unreachable: ensure Vite binds to `0.0.0.0` (start with `npm run dev -- --host` or set `--host 0.0.0.0`).
- CORS / mixed content issues: prefer proxying API via the same origin (nginx) or serve API over HTTPS if the UI is served via HTTPS.

## CI/CD

-  The .gitlab-ci.yml file defines separate jobs for dev and main branches, using different runners and environment variables.
    Secrets and sensitive variables should be stored in GitLab CI/CD variables, not in the repository.


## License

See the repository LICENSE file for license details.
