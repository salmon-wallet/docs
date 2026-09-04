---
title: Backend API Reference
description: Integrate with the Salmon HTTP API using its current endpoints, parameters, and error contracts.
navigation:
  icon: i-lucide-braces
seo:
  title: Salmon backend API reference
  description: Base URLs, endpoint groups, request examples, signing boundaries, and errors for the Salmon API.
---

The Salmon API serves the wallet applications with network discovery, balances, activity, market data, token and NFT data, swaps, and dApp metadata. The checked-in `backend/docs/openapi.yaml` file is the canonical machine-readable contract; this page is the task-oriented companion.

## Base URLs

| Environment | Base URL |
| --- | --- |
| Production | `https://api.salmonwallet.io` |
| Serverless offline | `http://127.0.0.1:3000/local` |

Examples below use an environment variable so the same command works against either deployment:

```bash
SALMON_API_URL=http://127.0.0.1:3000/local
curl "$SALMON_API_URL/status"
```

The API is public and does not require an API key from clients. Production browser requests are CORS-restricted, and `/v1` endpoints are subject to per-IP rate limits.

## Service and network discovery

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Dependency health, including network access and Redis |
| `GET` | `/status` | Service version, build, commit, stage, and server time |
| `GET` | `/ip` | Server-side IP geolocation lookup |
| `GET` | `/v1/networks` | Stage-aware network catalog and enabled feature sections |

Clients should use `/v1/networks` instead of hard-coding which networks and sections are enabled. A network entry includes its `id`, blockchain, environment, currency information, public configuration, `enabled` state, and feature `sections`.

```bash
curl "$SALMON_API_URL/v1/networks"
```

## Balances

```http
GET /v1/{networkId}/account/{address}/balance
```

Supported `networkId` values are:

- `solana-mainnet`, `solana-testnet`, and `solana-devnet`
- `bitcoin-mainnet` and `bitcoin-testnet`

Optional query parameters:

| Parameter | Meaning |
| --- | --- |
| `tokens` | Chain-specific token filter passed to the provider |
| `includeSpam=true` | Include assets normally removed by spam filtering |

The response is always an array. Each item identifies the owner, blockchain, amount in base units, decimals, symbol, name, type, and asset address. Price and logo fields are present only when enrichment succeeds.

```bash
curl "$SALMON_API_URL/v1/solana-mainnet/account/ACCOUNT_ADDRESS/balance"
```

Do not interpret a provider error as an empty balance. The backend deliberately surfaces failures rather than returning a misleading empty array.

## Solana activity and tokens

Solana paths accept `mainnet`, `testnet`, or `devnet` as `{env}`.

| Method | Path | Parameters |
| --- | --- | --- |
| `GET` | `/v1/solana-{env}/account/{address}/transactions` | `pageSize`, `pageToken` |
| `GET` | `/v1/solana-{env}/ft/verified` | None |
| `GET` | `/v1/solana-{env}/ft/search` | Required `query` |

`pageToken` is the transaction signature before which the next page is loaded. The primary provider is the configured RPC/DAS provider; Helius may serve as a rate-limited fallback when configured.

```bash
curl "$SALMON_API_URL/v1/solana-mainnet/account/ACCOUNT_ADDRESS/transactions?pageSize=20"
curl "$SALMON_API_URL/v1/solana-mainnet/ft/search?query=USDC"
```

## Swaps

### Create an order

```http
GET /v1/solana-{env}/ft/swap/order
```

Required query parameters are `inputMint`, `outputMint`, and `publicKey`. Supply exactly one amount representation appropriate to the client flow: `amount` for base units or `uiAmount` for a display amount.

```bash
curl --get "$SALMON_API_URL/v1/solana-mainnet/ft/swap/order" \
  --data-urlencode "inputMint=INPUT_MINT" \
  --data-urlencode "outputMint=OUTPUT_MINT" \
  --data-urlencode "publicKey=ACCOUNT_ADDRESS" \
  --data-urlencode "uiAmount=1.5"
```

The response includes order data plus the transaction material the client must review and sign. The backend never receives the seed phrase or private key.

### Execute a signed order

```http
POST /v1/solana-{env}/ft/swap/execute
```

Send the base64-encoded signed transaction and the `requestId` returned with the order:

```bash
curl -X POST "$SALMON_API_URL/v1/solana-mainnet/ft/swap/execute" \
  -H 'Content-Type: application/json' \
  -d '{
    "signedTransaction": "BASE64_SIGNED_TRANSACTION",
    "requestId": "ORDER_REQUEST_ID"
  }'
```

This endpoint accepts already signed transaction data. Never log the request body or reuse a signed order after its intended flow.

## NFTs

List the NFTs owned by a public key:

```http
GET /v1/solana-{env}/nft?publicKey={address}
```

Optional parameters are `includeSpam`, `limit`, `offset`, and `noCache`. Fungible assets are excluded. Spam filtering can make a page contain fewer items than the provider's reported total.

```bash
curl --get "$SALMON_API_URL/v1/solana-mainnet/nft" \
  --data-urlencode "publicKey=ACCOUNT_ADDRESS" \
  --data-urlencode "limit=20"
```

The transaction builders return unsigned material for client-side review and signing:

| Method | Path | Required query parameters |
| --- | --- | --- |
| `POST` | `/v1/solana-{env}/nft/{mintAddress}` | `owner` |
| `POST` | `/v1/solana-{env}/nft/{mintAddress}/transfer` | `owner`, `destination` |

Burn and transfer are destructive after the returned transaction is signed and submitted. Integrations must show an explicit approval step and verify the network, mint, owner, and destination.

## Bitcoin activity

Bitcoin paths accept `mainnet` or `testnet` as `{env}`.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/v1/bitcoin-{env}/account/{address}/transactions` | Canonical transaction history |
| `GET` | `/v1/bitcoin-{env}/account/{address}/utxo` | Spendable outputs for an address |

```bash
curl "$SALMON_API_URL/v1/bitcoin-mainnet/account/ACCOUNT_ADDRESS/transactions"
curl "$SALMON_API_URL/v1/bitcoin-mainnet/account/ACCOUNT_ADDRESS/utxo"
```

These endpoints are read-only. The backend does not receive or relay a signed Bitcoin transaction.

## Market data

| Method | Path | Useful parameters |
| --- | --- | --- |
| `GET` | `/v1/exchange-rates` | None |
| `GET` | `/v1/chart/{coinId}` | `days`, `currency` |
| `GET` | `/v1/chart/{platform}/contract/{address}` | `days`, `currency` |
| `GET` | `/v1/coin/{coinId}` | `currency` |
| `GET` | `/v1/coin/{platform}/contract/{address}` | `currency` |

`coinId` and `platform` are CoinGecko identifiers. For Solana tokens, `address` is the mint. Contract lookup can return `404` when CoinGecko does not list that asset; this is expected for long-tail tokens.

```bash
curl "$SALMON_API_URL/v1/chart/solana?days=7&currency=usd"
curl "$SALMON_API_URL/v1/coin/solana/contract/TOKEN_MINT?currency=usd"
```

## dApp metadata

```http
GET /v1/dapp/metadata?url={https-url}
```

The backend retrieves bounded OpenGraph metadata and returns a sanitized `name` and HTTPS `icon`. The URL is checked against SSRF protections and redirects are revalidated.

```bash
curl --get "$SALMON_API_URL/v1/dapp/metadata" \
  --data-urlencode "url=https://example.com"
```

Metadata is untrusted display content. It must never determine whether a signing request is approved.

## Analytics ingest

`POST /v1/events` accepts at most 100 allow-listed, anonymous events per batch. Address-like values, mints, raw numbers, oversized strings, and unknown properties are removed by server-side validation.

Successful ingestion returns `202`, including when delivery is best-effort. Analytics must remain opt-in at the client and must never contain wallet secrets or identifying blockchain data.

## Errors and retries

The standard error envelope is:

```json
{
  "error": "bad_request",
  "error_description": "Human-readable explanation"
}
```

Use `error` for program logic and show `error_description` only as contextual text. Do not branch on the human-readable message unless a documented legacy flow requires it.

| Status | Meaning | Client behavior |
| --- | --- | --- |
| `400` | Missing, invalid, or unsupported input | Correct the request; do not retry unchanged |
| `404` | Resource, route, quote, or asset not found | Show the specific outcome; retry only after inputs change |
| `422` | Valid input that cannot be processed safely | Explain the unsupported operation |
| `429` | Client rate limit | Back off before retrying |
| `500` | Backend or upstream failure | Treat as temporary unless the error says otherwise |
| `503` | Backend dependency unavailable or locally rate-limited | Retry with bounded exponential backoff |

Analytics errors are the exception: `/v1/events` returns a reduced `{ "error": "code" }` shape without `error_description`.

For automatic retries, use exponential backoff with jitter and a strict attempt limit. Never automatically retry a transaction execution unless the operation's status has been reconciled first.
