---
title: Backend Architecture
description: Layers, chain slices, providers, caching, and runtime deployment of the Salmon API.
navigation:
  icon: i-lucide-server
seo:
  title: Salmon backend architecture
  description: Understand the Express and Serverless backend used by Salmon Wallet.
---

The backend is an Express 5 application wrapped for Serverless deployment. It is organized by responsibility and then by blockchain.

## Request lifecycle

`routes → controllers → services → repositories/infrastructure → resources`

| Layer | Responsibility |
| --- | --- |
| Routes | Paths, middleware, validation wiring, and controller delegation |
| Controllers | Translate HTTP input into service calls and responses |
| Services | Business flow, provider selection, caching, and fallback policy |
| Repositories | Data-source access and provider adapters |
| Infrastructure | Shared technical clients, caches, and rate limiters |
| Resources | Stable public response shapes |

Code is divided into `solana`, `bitcoin`, `multichain`, and `shared` slices.

## Networks and capabilities

Chain routers mount below `/v1/<chain>-<environment>`. Cross-chain routes accept a full `networkId`. `/v1/networks` publishes enabled networks and feature sections for the current stage; clients should use it instead of hardcoding availability.

## Providers

- Solana enriched transactions and DAS/NFT data: Triton One first, Helius fallback.
- Solana swaps: Jupiter APIs. The wallet UI currently keeps swap disabled.
- Bitcoin history and UTXOs: Blockdaemon/Ubiquity integrations.
- Market data and fiat rates: CoinGecko-backed services.
- Token and scam metadata: shared Trust Wallet and scam-list services.

Provider orchestration belongs in services so fallbacks do not leak into controllers or response mappers.

## Caching and rate limiting

Redis supports shared caching and per-IP rate limiting. Production enforces limits; local development logs them by default. The global `/v1` limit and stricter transaction-building limit are configurable through `RATE_LIMIT_*` variables and fail open if Redis is unavailable.

## Deployment

Production deployments are tag-triggered through CI and AWS OIDC. Runtime secrets live in AWS SSM Parameter Store. See the backend repository's `docs/DEPLOY.md` for operational procedures; they intentionally remain outside this public product guide.
