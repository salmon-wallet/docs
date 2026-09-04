---
title: UI and Design System
description: How Salmon keeps mobile and extension interfaces aligned without sharing renderers.
navigation:
  icon: i-lucide-layout-template
seo:
  title: Salmon UI and design system
  description: Shared contracts, semantic tokens, and platform component twins.
---

Salmon shares behavior and design decisions across platforms, but not rendering code. React Native components live with mobile; DOM components live in `packages/ui`.

## Component twins

A cross-platform component normally has three pieces:

1. A shared `XPropsBase` contract in `packages/shared/src/types/ui`.
2. A React Native implementation in `apps/mobile/src/components`.
3. A DOM implementation in `packages/ui/src/components`.

Each platform can extend the base props for genuine runtime differences. Shared behavior belongs in a hook or context rather than being copied into both renderers.

## Theme

`packages/shared/src/theme` is the source of truth for color, typography, spacing, radius, and motion decisions. Semantic tokens describe purpose—such as text, surface, border, positive, or danger—rather than a fixed color.

The extension reads the live light/dark mode through `useSemantic()` and exposes tokens as `--sw-*` CSS variables. Mobile consumes the same token model through React Native styles.

## Parity

`pnpm check:parity` verifies that mobile components and screens have DOM twins or an explicit platform-only exception. It also detects contract and token violations. Use `pnpm check:parity:report` for a non-blocking report.

## Accessibility baseline

- Use semantic labels for every interactive control.
- Keep keyboard and focus behavior complete in the extension.
- Keep touch targets usable on mobile.
- Announce validation and loading states.
- Do not communicate risk using color alone.

Visual behavior can differ when platform conventions require it, but the action, state, and safety meaning should remain consistent.
