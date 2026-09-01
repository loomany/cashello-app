# Live site parity report

**Tested URL:** https://cashello.scholarshiptop.com/legacy/home?guest=1  
**Reconciliation:** CASHELLO_HANDOFF_FINAL_RECONCILIATION · 2026-09-01  
**Repository HEAD:** `4379c6ba172e23e2392b27a40ecc1e4879a3daf4`

## Verification levels

| Level | Meaning |
| --- | --- |
| `LIVE_BUILD_MATCH` | Live JS bundle hash matches local `dist/` export from this repo |
| `MANUAL_RUNTIME_VERIFIED` | Specific UI state manually clicked and observed on live |
| `LIVE_BUILD_MATCH_ONLY` | Bundle parity only — state not manually re-verified on live |

**Bundle:** `entry-50d3d080e06bce5cdee6bda2a76d9ea1.js` — **LIVE_BUILD_MATCH** confirmed.

---

## Guest flow matrix

| Flow | Route | Live verification | Notes |
| --- | --- | --- | --- |
| Guest home | `/legacy/home?guest=1` | MANUAL_RUNTIME_VERIFIED | Segmented nav visible |
| Top-up entry | `/legacy/topup` | LIVE_BUILD_MATCH_ONLY | |
| Withdraw entry | `/legacy/withdraw` | LIVE_BUILD_MATCH_ONLY | |
| P2P Cashhello user | `/legacy/withdraw/cashhello-user` | LIVE_BUILD_MATCH_ONLY | **P2P** — not cash |
| Cash withdraw | `/legacy/withdraw/cash*` | LIVE_BUILD_MATCH_ONLY | OUT_OF_MVP |
| Payment | `/legacy/payment` | LIVE_BUILD_MATCH_ONLY | |
| QR tab | `/legacy/qr` | LIVE_BUILD_MATCH_ONLY | FUTURE — no MVP backend |
| Support FAB | global sheet | MANUAL_RUNTIME_VERIFIED | Placeholder links (APP_UI_GAP) |

## Screenshot live status

158 screenshots: **not** all manually runtime-verified on live. Manifest uses per-row `live_verification`:

- `MANUAL_RUNTIME_VERIFIED` — guest/authorized home primary states only
- `LIVE_BUILD_MATCH_ONLY` — all other captured states (source/screenshot evidence; bundle parity)

---

## Final parity verdict

**PARTIAL** — build matches (`LIVE_BUILD_MATCH`). Product gaps documented (support UI, cash/QR in prototype but out of MVP scope). P2P route `/legacy/withdraw/cashhello-user` correctly scoped to BP-P2P-001.
