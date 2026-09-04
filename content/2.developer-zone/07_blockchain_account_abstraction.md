---
title: Blockchain Integration
description: Account abstractions, network enablement, transaction paths, and chain-specific boundaries.
navigation:
  icon: i-lucide-blocks
seo:
  title: Salmon blockchain integration
  description: Solana and Bitcoin architecture in Salmon Wallet.
---

Blockchain logic lives in `packages/shared/src/blockchain`, separated by chain. Each account implementation receives API functions through dependency injection so shared logic can be tested without a live backend.

## Solana

Solana support includes balances, token metadata, transaction history, address validation and name resolution, collectibles, transaction construction, status tracking, message signing, and off-chain messages.

Account derivation uses `m/44'/501'/{index}'/0'`. Transaction creation and signing use the current Solana Kit surface, with compatibility code where external standards still expose legacy transaction types.

Solana mainnet, testnet, and devnet are present in the backend catalog. Developer networks are hidden unless developer mode is enabled.

## Bitcoin

Bitcoin read support includes balances, history, and UTXOs. The frontend also contains fee estimation, transaction construction, signing, broadcast, confirmation, and maximum-send code, but these pieces do not form a working end-to-end send path in the current product.

Account derivation uses `m/44'/0'/{index}'/0/0` and produces P2PKH addresses. Mainnet and testnet use the same coin-type path in the current implementation. Spending those P2PKH outputs requires the full previous transaction (`nonWitnessUtxo`), which the current backend provider does not supply. This is the missing contract that prevents Bitcoin sending from completing.

The intended broadcast path is client-side through public relays; private keys and signed Bitcoin bytes do not pass through the Salmon backend. Do not treat the presence of the transaction-building modules as evidence that sending is supported.

## Network availability

Static chain helpers provide defaults and typing, but `/v1/networks` is authoritative at runtime. A chain requires code, a route slice, network definitions, capability enablement, and frontend presentation before it is considered supported.
