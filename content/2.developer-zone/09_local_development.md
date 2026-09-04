---
title: Local Development
description: Set up, run, test, and build the Salmon frontend, backend, and documentation.
navigation:
  icon: i-lucide-terminal
seo:
  title: Salmon local development
  description: Commands and verification checks for Salmon contributors.
---

Keep the three repositories beside each other:

```text
projects/
├── salmon-wallet-frontend/
├── salmon-wallet-backend/
└── salmon-docs/
```

## Frontend

Requirements: Node.js `^20.19.0` or `^22.12.0`, pnpm 9, and Corepack.

```bash
corepack enable
corepack prepare pnpm@9.0.0 --activate
pnpm install
pnpm dev
```

Useful targets:

```bash
pnpm extension:dev
pnpm mobile:start
pnpm mobile:ios
pnpm mobile:android
```

Copy the relevant `.env.example` for local development. Local application defaults target the sibling backend at `http://127.0.0.1:3000/local`.

Before a pull request:

```bash
pnpm format:check
pnpm turbo run typecheck lint test
pnpm check:i18n
pnpm check:parity
```

## Backend

Copy `.env.example` to `.env` and configure the provider credentials needed by the routes you are testing. Local Solana functionality requires a valid RPC endpoint; it does not require Helius specifically. Keep RPC URLs, API keys, and tokens only in the ignored `.env` file and never commit them.

For Solana, `TRITON_RPC_URL` is the primary mainnet RPC setting. Despite its name, the backend accepts a complete compatible RPC URL here; `TRITON_API_TOKEN` is only needed when a Triton URL does not already contain its token. `HELIUS_API_KEY` enables the Helius fallback and enhanced API, but it is not required when the configured primary provider covers the functionality being tested.

| Variable | Required when | Purpose |
| --- | --- | --- |
| `TRITON_RPC_URL` | Testing Solana mainnet through the primary path | Mainnet RPC and DAS endpoint |
| `TRITON_RPC_URL_DEVNET` | Using a private devnet provider | Optional devnet RPC; otherwise the public Solana devnet RPC is used for basic calls |
| `TRITON_API_TOKEN` | The configured Triton URL does not already embed its token | Appended to bare Triton URLs |
| `HELIUS_API_KEY` | Testing Helius fallback or Helius-only enhanced functionality | Fallback RPC, DAS, and enhanced transactions |
| `REDIS_*` | Running routes that use cache or rate limiting | Local Redis connection |

Start Redis with Docker Compose, then run the Serverless offline target as described in the backend README. By default, the API is available at `http://127.0.0.1:3000/local`; the frontend is already configured to use that URL during local development.

Verify the process and its dependencies separately:

```bash
curl http://127.0.0.1:3000/local/status
curl http://127.0.0.1:3000/local/health
```

`/status` identifies the running build. `/health` also checks dependencies, including Redis, and can return `500` while the HTTP process itself is running.

Core checks:

```bash
npm run lint:check
npm run format:check
npm run test:unit
npm run test:integration
```

Integration tests can depend on local Redis or external providers. The backend repository's `docs/TESTING.md` documents hermetic and Docker-based options.

## Documentation

Use Node 20 or Node 22–25.

```bash
npm ci
npm run dev
npm run build
```

The preview runs at `http://localhost:3000`. The production build is emitted to `.output`.

## Scope checks

Read the closest `AGENTS.md` before changing source. Frontend package and application folders have scoped rules; backend layers and chain slices do as well. Run the smallest relevant checks first, then the repository-wide gates before submission.
