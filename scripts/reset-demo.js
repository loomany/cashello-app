#!/usr/bin/env node

/**
 * Canonical demo reset cannot clear device/web AsyncStorage from this Node process.
 * Use the in-app developer control instead.
 */
console.log(`
PayDala reference prototype — restore canonical demo state
==========================================================

In-app (required):
  1. Triple-tap the top-left corner on Home and use Reset in the debug overlay
  2. Or open /dev/foundation and tap “Reset canonical demo”

Storage key:
  @paydala/mock-state

This script does not talk to a backend. There is no backend.
`);
