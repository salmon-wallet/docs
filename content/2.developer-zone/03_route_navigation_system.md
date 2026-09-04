---
title: Product Flows
description: The main user flows and where their behavior belongs.
navigation:
  icon: i-lucide-route
seo:
  title: Salmon Wallet product flows
  description: Onboarding, home, send, collectibles, settings, and dApp approval flows.
---

## Onboarding

Both applications support create and restore flows, recovery-phrase confirmation for newly created wallets, password creation, a completion step, and analytics consent before entering Home. Mobile also offers biometric setup. Restored wallets scan for previously used derived accounts on the first unlocked mount.

Secrets are generated or parsed in shared crypto logic. Platform screens collect input and render progress; they do not own key derivation or vault encryption.

## Wallet home

The home surface combines the active account, selected network, token balances, collectibles, and pending activity. Shared contexts own account and network state so switching an account updates every dependent view together.

## Send and receive

Receive surfaces show the active chain address and QR code. Solana send flows collect a destination and amount, validate both, build a transaction, present a review step, then sign and submit only after confirmation. Watch-only accounts can use read paths but are excluded from every signing path.

Submitted transactions remain tracked as pending work. Solana status handling distinguishes confirmed, failed, expired, and unknown outcomes so a temporary network failure does not invite an unsafe duplicate send.

Bitcoin is read-only in the current product. Its balance, activity, and UTXO paths are active, but the P2PKH send path cannot complete without full previous-transaction data. Do not expose Bitcoin send as supported until that contract changes.

The shared Solana swap engine remains implemented, but neither application exposes a reachable swap route in the current release. The parked mobile route and shared hooks are not evidence of product availability.

## Collectibles

Solana collectibles have list, detail, send, review, success, and burn flows. Provider failure and an empty collection are separate states. Burn operations are irreversible and require explicit review.

## Settings

Settings include accounts, account name/avatar, backup, private-key export, security, biometrics on mobile, language, currency, appearance, explorer, address book, trusted apps, analytics consent, support, and about information. The add-account flow supports derivation, recovery-phrase import, supported private-key import, and watch-only Solana accounts. Developer mode exposes non-production networks and unverified assets.

## dApp approvals

The extension handles connect, transaction signing, sign-and-send, message signing, and Sign-In With Solana. Approval pages receive a normalized request from extension runtime code and return an explicit approval or rejection.

Android can accept compatible Mobile Wallet Adapter requests. iOS does not expose that flow because background suspension breaks the required connection model.
