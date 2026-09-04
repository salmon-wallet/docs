# Salmon Wallet Docs

**Open Wallet Infrastructure — documented.**

This repository powers the public documentation for [Salmon Wallet](https://salmonwallet.io). It covers the released mobile and browser-extension surfaces, safe wallet use, architecture, API integration, and contribution workflows.

> “We want Salmon to be 100% transparent. Open-source software promotes decentralization and allows for a more democratic and inclusive ecosystem. It enables anyone to participate and contribute to the project, fostering long-term sustainability and growth. It also helps to ensure the security and reliability of the code. Why should we use a closed-source self-custodial wallet then?”

## Quick start

Use Node.js 20, or a version from 22 through 25. Node.js 26 is not currently supported by the project's SQLite dependency.

```bash
# Install dependencies
npm install

# Start the docs locally
npm run dev
```

Your preview will be available at `http://localhost:3000`.

## What these docs cover

- **Install & verify** — Get Salmon from the official sources and confirm authenticity.
- **Create or restore** — Set up a self-custodial wallet and protect your recovery phrase.
- **Use Salmon** — Send, receive, review activity, manage accounts, and work with collectibles.
- **Connect to dApps** — Understand Wallet Standard connections and approval requests.
- **Build Salmon** — Learn the frontend, backend, API, storage, blockchain, and testing architecture.

## Repo layout

```
salmon-wallet-docs/
├── content/               # Markdown + MDC content
│   ├── index.md           # Homepage
│   ├── 1.getting-started/ # User guides, security, releases, contributing
│   └── 2.developer-zone/  # Source-backed architecture and development guides
├── public/                # Static assets (favicons, images)
└── package.json           # Scripts and dependencies
```

## Tooling

Built with [Nuxt 4](https://nuxt.com), [Nuxt Content](https://content.nuxt.com/), and [Nuxt UI](https://ui.nuxt.com) on the Docus layer for structure and theming.

## Contributing

Contributions of all kinds are welcome—bug fixes, new guides, or clarification to make onboarding clearer. Clone the repo, run `npm run dev`, and open a pull request describing your changes. Feedback and discussion in issues help us prioritize what the community needs most.

For product and architecture documentation, verify claims against the corresponding source revision. Include links to relevant source files or pull requests, distinguish released behavior from planned work, and test commands and links before submitting.

## Security

If you discover a vulnerability or security concern, please avoid opening a public issue. Contact the maintainers directly so we can coordinate responsible disclosure and a prompt fix.

## Deployment

```bash
npm run build
```

The static output is emitted to `.output` for hosting.

## Links

- Product & downloads: [salmonwallet.io](https://salmonwallet.io)
- Updates & announcements: [medium.com/@salmonwallet](https://medium.com/@salmonwallet)
- Wallet source code: [github.com/Salmon-HQ/salmon-wallet-frontend](https://github.com/Salmon-HQ/salmon-wallet-frontend)
- Backend source code: [github.com/Salmon-HQ/salmon-wallet-backend](https://github.com/Salmon-HQ/salmon-wallet-backend)
