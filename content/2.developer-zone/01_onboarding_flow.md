---
title: Frontend Architecture
description: Understand the frontend monorepo, ownership boundaries, and application entry points.
navigation:
  icon: i-lucide-panels-top-left
seo:
  title: Salmon frontend architecture
  description: Packages, apps, routing, and ownership rules in the Salmon Wallet frontend.
---

The frontend is a pnpm workspace coordinated by Turborepo. It uses TypeScript and React 19 across the active applications.

## Repository layout

```text
apps/
├── extension/   # WXT extension: background, content, injected and side-panel UI
└── mobile/      # Expo / React Native application
packages/
├── assets/      # Shared fonts, icons and images
├── shared/      # Cross-platform logic and contracts
└── ui/          # React DOM components for the extension
```

## Ownership rules

### `packages/shared`

Owns everything that does not draw: API services, blockchain logic, crypto, storage, hooks, contexts, settings contracts, semantic types, i18n resources, and theme tokens. It must remain usable from React Native and the browser.

### `packages/ui`

Owns DOM components shared by extension surfaces. It must not be imported by the mobile app.

### `apps/mobile`

Owns React Native rendering, Expo Router routes, native integrations, biometrics, QR scanning, screen-capture protection, and Mobile Wallet Adapter wiring.

### `apps/extension`

Owns WXT entrypoints, browser APIs, injected providers, Wallet Standard integration, dApp approval pages, side-panel navigation, and session-specific key caching.

## One flow, two renderings

Shared hooks and contexts hold wallet behavior once. Mobile and extension render platform-specific components against shared `*PropsBase` contracts. The parity check prevents the two applications from silently drifting.

Put new code in the narrowest correct owner. Do not place DOM or React Native dependencies in `packages/shared`, and do not duplicate a backend contract inside an app.

## Routing

Mobile uses Expo Router files under `apps/mobile/app`. Auth routes cover setup and recovery; protected routes cover the wallet, activity, sends, collectibles, settings, and account management.

The extension uses page state inside the side panel. Separate WXT entrypoints provide the background worker, content script, injected provider, popup bootstrap, and side-panel bootstrap.
