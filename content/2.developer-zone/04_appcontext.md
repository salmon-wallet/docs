---
title: State, Storage, and Vault
description: How shared contexts, persistent storage, and encrypted key material work together.
navigation:
  icon: i-lucide-database
seo:
  title: Salmon state, storage, and vault
  description: Account state, persistence adapters, locking, and password changes.
---

## Shared state

`packages/shared/src/contexts` and `packages/shared/src/hooks` own cross-platform state and flows. Important domains include accounts, currency, pending transactions, settings, theme, network selection, and feature-specific operations.

Contexts expose state plus actions. Platform roots supply runtime adapters and render the resulting state. This keeps business behavior consistent without importing platform UI into the shared package.

## Storage adapters

`packages/shared/src/storage` defines the storage contract and stable keys. Runtime adapters provide the actual implementation for React Native and browser-extension storage.

Stored data includes the encrypted vault, account metadata, selected account/network, preferences, address book, trusted apps, pending transactions, and migration markers. Sensitive values must be encrypted before persistence.

## Vault encryption

The vault uses:

- PBKDF2-HMAC-SHA512 for password-based key derivation.
- A random salt and per-vault iteration count.
- NaCl `secretbox` authenticated encryption with a random nonce.
- Base58 encoding for persisted binary fields.

New or re-encrypted vaults currently use 220,000 PBKDF2 iterations. Unlock reads the parameters stored with each vault, preserving compatibility with older vaults.

## Locking

An unlocked application keeps only the material required for the active session. Extension session-key caching is extension-owned; biometric key handling is mobile-owned. Lock, logout, and password-change paths clear the relevant cached key.

Password changes are atomic: the application reports success only after the re-encrypted vault is persisted. A failure before persistence leaves the old password valid.

## Migrations

Persistent shapes can outlive several application versions. Storage changes require migration logic and tests; never infer encryption state only from a convenience flag when the vault shape provides stronger evidence.
