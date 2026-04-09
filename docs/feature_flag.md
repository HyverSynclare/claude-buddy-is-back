# Feature Flag: tengu_miraculo_the_bard

## Overview

The buddy companion system is gated behind the feature flag `tengu_miraculo_the_bard`.

## Details

| Property       | Value                        |
|----------------|------------------------------|
| Flag name      | `tengu_miraculo_the_bard`    |
| Default value  | `false`                      |
| Check function | `h_()`                       |
| Activation     | Enables `vX6()` companion startup path |

## Context

- Claude Code v2.1.92 contains approximately **870 feature flags** in total
- All feature flags use the `tengu_` prefix naming convention
- The `h_()` function is the obfuscated utility that checks whether a given flag is enabled for the current user/session

## Activation Path

When the flag is enabled:

```
h_("tengu_miraculo_the_bard") === true
  -> vX6() is called during startup
    -> Companion is generated or loaded from cache
      -> companion_intro attachment is created
        -> Companion appears in the UI
```

When the flag is disabled (default):

```
h_("tengu_miraculo_the_bard") === false
  -> vX6() is never called
  -> No companion-related code executes
  -> No companion_intro attachment is created
```

## Requirements for Activation

All three conditions must be true:

1. `tengu_miraculo_the_bard` flag is set to `true` for the user
2. User has first-party authentication (Anthropic account, not API key)
3. Current date is April 2026 or later

The combined check happens in `isCompanionAvailable()`.
