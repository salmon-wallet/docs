# Salmon Wallet Docs

**Self-custodial, open-source, and community-owned Solana wallet — documented.**

This repository powers the public documentation for [Salmon Wallet](https://salmonwallet.io). It captures how to install and verify Salmon, keep your recovery phrase safe, connect to Solana dApps, and contribute to the project. Our guiding principle: transparency keeps self-custody secure and sustainable for everyone.

> “We want Salmon to be 100% transparent. Open-source software promotes decentralization and allows for a more democratic and inclusive ecosystem. It enables anyone to participate and contribute to the project, fostering long-term sustainability and growth. It also helps to ensure the security and reliability of the code. Why should we use a closed-source self-custodial wallet then?”

## Quick start

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
- **Use Salmon with dApps** — Connect confidently to Solana apps and review permissions.
- **Migrate from other wallets** — Bring your existing Solana accounts into Salmon safely.
- **Contribute** — Improve the wallet and docs; openness keeps the ecosystem resilient.

## Repo layout

```
salmon-wallet-docs/
├── content/               # Markdown + MDC content
│   ├── index.md           # Homepage
│   ├── 1.getting-started/ # Install, safety basics, contribute
│   └── 2.developer-zone/  # Wallet architecture chapters (onboarding → adapters)
├── public/                # Static assets (favicons, images)
└── package.json           # Scripts and dependencies
```

## Tooling

Built with [Nuxt 4](https://nuxt.com), [Nuxt Content](https://content.nuxt.com/), and [Nuxt UI](https://ui.nuxt.com) on the Docus layer for structure and theming.

## Contributing

Contributions of all kinds are welcome—bug fixes, new guides, or clarification to make onboarding clearer. Clone the repo, run `npm run dev`, and open a pull request describing your changes. Feedback and discussion in issues help us prioritize what the community needs most.

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
- Wallet source code: [github.com/salmonw-wallet/salmon-wallet-v2](https://github.com/salmon-wallet/salmon-wallet-v2)
