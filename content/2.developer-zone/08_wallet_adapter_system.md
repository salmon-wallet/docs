---
title: API and dApp Integration
description: Public API endpoints and the extension's Solana Wallet Standard surface.
navigation:
  icon: i-lucide-waypoints
seo:
  title: Salmon API and dApp integration
  description: HTTP endpoints, Wallet Standard features, and approval boundaries.
---

## Public HTTP API

The backend's OpenAPI document is the canonical wire reference. For parameters, examples, response behavior, and errors, see the [Backend API Reference](/developer-zone/10_backend_api_reference).

Current endpoint groups are:

| Area | Endpoints |
| --- | --- |
| Service | `GET /health`, `GET /status`, `GET /ip` |
| Networks | `GET /v1/networks` |
| Market data | Exchange rates, coin details, and market charts under `/v1` |
| dApps | `GET /v1/dapp/metadata` |
| Multichain | `GET /v1/{networkId}/account/{address}/balance` |
| Solana accounts | Transaction history under `/v1/solana-{env}/account` |
| Solana tokens | Verified tokens, search, swap order, and swap execution |
| Solana NFTs | List, unsigned burn transaction, and unsigned transfer transaction |
| Bitcoin | Transaction history and UTXOs under `/v1/bitcoin-{env}/account` |
| Analytics | `POST /v1/events` |

Public response shaping belongs in backend resources. Shared frontend wrappers live in `packages/shared/src/api/services`; applications should not call these endpoints through duplicate local clients.

The public API does not require client credentials. Browser access is CORS-restricted and `/v1` routes are rate-limited, so consumers must handle `4xx`, `5xx`, and temporary provider failures explicitly.

## Signing boundary

The API can return balances, history, metadata, quotes, or unsigned transaction material. Seed phrases and private keys remain in the client. Signing and user approval are client responsibilities.

## Browser extension integration

The extension injects a Solana provider and registers a Wallet Standard wallet. It supports:

- `standard:connect` and `standard:disconnect`
- `solana:signTransaction`
- `solana:signAndSendTransaction`
- `solana:signMessage`
- `solana:signIn` 1.1.0

Requests pass through background/content/injected extension boundaries and open a dedicated approval page. Origins are checked, accounts are matched to the request, and rejection is returned explicitly.

## Off-chain messages

Salmon supports Solana Off-chain Message Signing v1. Its domain-separated format cannot be confused with a serialized Solana transaction. This reduces transaction-lookalike risk, but the user must still verify the requesting origin and message content.

## Trusted apps

Approved origins are stored per wallet account. Silent reconnect is allowed only for a trusted origin. Users can revoke entries from Settings; locking or switching relevant state forces the provider to update its connection.
