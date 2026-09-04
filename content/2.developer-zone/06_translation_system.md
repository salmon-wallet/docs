---
title: Internationalization
description: English and Spanish resources, runtime adapters, and contribution rules.
navigation:
  icon: i-lucide-languages
seo:
  title: Salmon internationalization
  description: How Salmon keeps English and Spanish interfaces in sync.
---

Salmon ships English and Spanish copy through i18next. User-facing text must use translation keys rather than hardcoded strings.

## Sources

- Shared application copy: `packages/shared/src/locales/en` and `packages/shared/src/locales/es`.
- Browser extension manifest copy: `apps/extension/public/_locales/en` and `apps/extension/public/_locales/es`.
- Platform initialization: each application owns its i18next runtime adapter.

## Rules

- Add or update the English and Spanish key together.
- Preserve interpolation variables and plural forms across languages.
- Spanish uses Rioplatense voseo, not generic Latin American Spanish.
- Do not guess a translation when product meaning is ambiguous.
- Keep keys semantic and stable; moving visible copy should not require renaming a key.

## Verification

Run:

```bash
pnpm check:i18n
```

The check verifies exact English/Spanish key parity across shared resources and extension locale files. Package-level shared checks are also available through `@salmon/shared`.

When changing copy in a shared flow, verify it in both mobile and extension because layout constraints and accessibility announcements differ.
