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

Both applications support create and restore flows, recovery-phrase confirmation, password creation, analytics consent, and a completion step. Mobile also offers biometric setup.

Secrets are generated or parsed in shared crypto logic. Platform screens collect input and render progress; they do not own key derivation or vault encryption.

## Wallet home

The home surface combines the active account, selected network, token balances, collectibles, and pending activity. Shared contexts own account and network state so switching an account updates every dependent view together.

## Send and receive

Receive surfaces show the active chain address and QR code. Send flows collect a destination and amount, validate both, build a transaction, present a review step, then sign and submit only after confirmation.

Submitted transactions remain tracked as pending work. Solana status handling distinguishes confirmed, failed, expired, and unknown outcomes so a temporary network failure does not invite an unsafe duplicate send.

## Collectibles

Solana collectibles have list, detail, send, review, success, and burn flows. Provider failure and an empty collection are separate states. Burn operations are irreversible and require explicit review.

## Settings

Settings include accounts, account name/avatar, backup, private-key export, security, biometrics on mobile, language, currency, appearance, explorer, address book, trusted apps, support, and about information. Developer mode exposes non-production networks.

## dApp approvals

The extension handles connect, transaction signing, sign-and-send, message signing, and Sign-In With Solana. Approval pages receive a normalized request from extension runtime code and return an explicit approval or rejection.

Android can accept compatible Mobile Wallet Adapter requests. iOS does not expose that flow because background suspension breaks the required connection model.
