---
title: System Overview
description: How the Salmon applications, shared packages, and backend fit together.
navigation:
  icon: i-lucide-boxes
seo:
  title: Salmon system overview
  description: A source-backed overview of the Salmon Wallet architecture.
---

Salmon is split across three repositories:

| Repository | Responsibility |
| --- | --- |
| [`salmon-wallet-frontend`](https://github.com/Salmon-HQ/salmon-wallet-frontend) | Mobile app, browser extension, shared wallet logic, UI, and assets |
| [`salmon-wallet-backend`](https://github.com/Salmon-HQ/salmon-wallet-backend) | Public HTTP API, data-provider orchestration, caching, and network capability catalog |
| [`docs`](https://github.com/salmon-wallet/docs) | User and contributor documentation |

## Runtime surfaces

The frontend produces two applications:

- `apps/mobile`: React Native application built with Expo.
- `apps/extension`: Chrome MV3 and Firefox extension built with WXT. It renders as a browser side panel.

The standalone web wallet is retired. Both active applications reuse business logic from `packages/shared`; the extension uses the DOM component library in `packages/ui`, while mobile owns its React Native components.

## Request flow

For backend-backed data, the normal flow is:

`screen → shared hook/context → API service → Salmon API → provider → resource response`

Key creation and transaction signing stay in the client. The backend returns public data or unsigned transaction material; it does not receive the user's recovery phrase or private key.

## Supported chains

- Solana: active and the most developed integration.
- Bitcoin: active for balances, history, UTXOs, and receiving. Sending is not available end to end in the current product.

The backend's `/v1/networks` response is the runtime source of truth for enabled networks and features.

## Source versions reviewed

This documentation was rebuilt against frontend `main` and backend `origin/main` on September 4, 2026. Product behavior can move faster than these docs; when a conflict exists, tests and current source code win.
