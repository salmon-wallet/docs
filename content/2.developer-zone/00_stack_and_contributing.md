---
title: Stack, scripts, and contributing
description: Tech stack overview, project layout, and how to contribute to Salmon Wallet.
navigation:
  icon: i-lucide-hammer
seo:
  title: Salmon stack and contributing
  description: Learn the Salmon Wallet stack, repository layout, and contribution workflow.
---

## Stack at a glance

- React 18 + React Native 0.70 for shared UI and logic.
- Web client uses Create React App; browser extensions target Chrome/Brave and Firefox.
- Solana integration via `@solana/web3.js` 1.95.x; Bitcoin flows use BitcoinJS.
- Node 18+ required; serverless helpers ship for release automation.

## Repository layout

- `src/` – shared React components, hooks, screens, and blockchain integration logic.
- `extension/` – background/content scripts and manifests for Chromium/Firefox bundles.
- `android/`, `ios/` – React Native platform projects (run pods in `ios/` after install).
- `assets/`, `public/` – static assets consumed across targets.
- Env templates live at repo root (`env.local.json`, `env.develop.json`, `env.main.json`, `env.prod.json`).

## Install and run

```bash
yarn install
cd ios && pod install   # iOS only
```

Pick an environment by setting `REACT_APP_SALMON_ENV` or copying the right template into `env.local.json`.

- Web dev: `yarn start:web` (CRA dev server on port 3006 by default)
- Web builds: `yarn build`, `yarn build:main`, `yarn build:prod`
- Extension bundles: `yarn build:extension` (or `:chrome`, `:mozilla`)
- Tests: `yarn test` (web) and `yarn test:native` (React Native)
- Lint: `yarn lint` / `yarn lint:fix`

## Contributing

- Read `CONTRIBUTION-AGREEMENT.md` before opening a PR.
- Follow lint/test checks locally before submitting.
- Open issues for bugs or feature proposals; avoid public reports for security concerns and contact maintainers directly.
