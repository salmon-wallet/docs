---
title: Onboarding Flow
description: Guide users through creating or recovering a Salmon wallet safely with a clear setup wizard.
navigation:
  icon: i-lucide-rocket
seo:
  title: Onboarding Flow
  description: How Salmon’s onboarding flow helps users create or recover wallets securely with guided steps.
---

# Chapter 1: Onboarding Flow

The onboarding flow is the first safety gate in Salmon: it creates or restores a wallet, anchors recovery, and routes users into the main experience with minimal risk.

## Goals
- Make “Create” and “Recover” obvious and mutually exclusive.
- Keep seed phrases on-device and never expose them outside trusted UI.
- Collect only what’s essential (password, seed phrase confirmation).
- Block navigation until critical steps are completed.

## Core flow
1) **Entry screen:** CTA for Create vs Recover. Minimal copy, clear benefits for each path.  
2) **Create:** Generate seed phrase, force full phrase reveal, require confirmation (word positions), then set a local password.  
3) **Recover:** Paste/enter phrase, validate checksum/length, prompt for password.  
4) **Post-setup:** Surface backup reminder + “Go to wallet” CTA; offer learn-more links, not extra choices.

## UX safety checklist
- Disable screenshots on mobile during phrase display when possible.  
- Clipboard: avoid auto-copy; if allowed, show a timed warning.  
- Require explicit acknowledgement of recovery guidance before continuing.  
- Show network (mainnet/devnet) status early to reduce confusion later.

## Key implementation hooks
- Navigation: `useNavigation()` routes between steps.  
- UI: button/alert components from the component library for consistent emphasis.  
- Validation: seed utilities for checksum/wordlist validation; password strength hints in-line.

## Test cases
- Create flow blocks progression until phrase is confirmed.  
- Recover rejects malformed/short phrases with actionable errors.  
- Password prompt appears for both create/recover.  
- After success, wallet state is present in `AppContext` and storage.

## Sequencing (high level)
1. User selects Create/Recover → route change.  
2. Seed phrase generated or validated.  
3. Backup confirmation → password set.  
4. Account locked + stored → context updated → navigate to wallet.

## Tips for maintainers
- Keep copy concise and directive; remove jargon in onboarding screens.  
- Log declined/failed steps (anonymized) to find friction points.  
- Reuse the same password/seed components in both create and recover to reduce divergence.

---
