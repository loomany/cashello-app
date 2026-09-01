# NEW app screen catalog

**Audit date:** 2026-09-01  
**IDs:** NEW-* stable IDs (not legacy CAS-/LGC- IDs)  
**Machine-readable:** [NEW_APP_SCREEN_CATALOG.json](./NEW_APP_SCREEN_CATALOG.json)

## Summary

| mvp_status | Count |
| --- | ---: |
| MVP | 29 |
| MVP_PARTIAL_PENDING | 3 |
| FUTURE | 1 |
| PARKED_ILYA | 9 |
| OUT_OF_MVP | 2 |
| ORPHANED / STUB / DEV | 5 |
| **Total screens** | **49** |

| screen_id | name | route | mvp_status | business_process | backend_needed |
| --- | --- | --- | --- | --- | --- |
| NEW-ENTRY-001 | App entry redirect | `/` | MVP | — | no |
| NEW-HOME-001 | Guest Home | `/legacy/home?guest=1` | MVP | BP-AUTH-001 | partial |
| NEW-HOME-002 | Authorized Home | `/legacy/home` | MVP | BP-ACC-001 | yes |
| NEW-AUTH-001 | Auth splash | `/legacy/auth` | MVP | BP-AUTH-001 | no |
| NEW-AUTH-002 | Auth onboarding | `/legacy/auth` | MVP | BP-AUTH-001 | no |
| NEW-AUTH-003 | Phone / IIN entry (login entry) | `/legacy/auth?qaStep=iin` | MVP | BP-AUTH-001,BP-AUTH-002 | yes |
| NEW-AUTH-004 | Identity intro (KYC prototype) | `/legacy/auth` | PARKED_ILYA | BP-KYC-001 | no |
| NEW-AUTH-005 | Face camera (KYC prototype) | `/legacy/auth` | PARKED_ILYA | BP-KYC-001 | no |
| NEW-AUTH-006 | Face fallback (KYC prototype) | `/legacy/auth` | PARKED_ILYA | BP-KYC-001 | no |
| NEW-AUTH-007 | Document front (KYC prototype) | `/legacy/auth` | PARKED_ILYA | BP-KYC-001 | no |
| NEW-AUTH-008 | Document turn (KYC prototype) | `/legacy/auth` | PARKED_ILYA | BP-KYC-001 | no |
| NEW-AUTH-009 | Document back (KYC prototype) | `/legacy/auth` | PARKED_ILYA | BP-KYC-001 | no |
| NEW-AUTH-010 | KYC phone step (prototype) | `/legacy/auth` | PARKED_ILYA | BP-KYC-001 | no |
| NEW-AUTH-011 | WhatsApp OTP verification | `/legacy/auth` | MVP | BP-AUTH-001,BP-AUTH-002 | yes |
| NEW-AUTH-012 | Create PIN | `/legacy/auth` | MVP | BP-AUTH-001 | yes |
| NEW-AUTH-013 | Repeat PIN | `/legacy/auth` | MVP | BP-AUTH-001 | yes |
| NEW-AUTH-014 | PIN mismatch error | `/legacy/auth` | MVP | BP-AUTH-001 | yes |
| NEW-AUTH-015 | PIN login (returning user) | `/legacy/auth` | MVP | BP-AUTH-002 | yes |
| NEW-PAY-001 | Payment catalog | `/legacy/payment` | MVP | BP-PAY-001 | yes |
| NEW-PAY-002 | Service payment form | `/legacy/payment/[id]` | MVP | BP-PAY-001 | yes |
| NEW-QR-001 | Receive QR | `/legacy/qr` | FUTURE | BP-QR-001 | no |
| NEW-HIST-001 | History list | `/legacy/history` | MVP | BP-HIST-001 | yes |
| NEW-HIST-002 | Operation detail | `/legacy/history/[id]` | MVP | BP-HIST-001 | yes |
| NEW-HIST-003 | Receipt | `/legacy/history/[id]/receipt` | MVP | BP-HIST-001 | yes |
| NEW-PROF-001 | Profile | `/legacy/profile` | MVP | BP-PROFILE-001,BP-PROFILE-002 | yes |
| NEW-PROF-002 | Identification status | `/legacy/profile/status` | PARKED_ILYA | BP-KYC-001 | no |
| NEW-PROF-003 | Change PIN | `/legacy/profile/pin` | MVP | BP-PROFILE-002 | yes |
| NEW-STUB-001 | Documents stub | `/legacy/stub/documents` | STUB | — | no |
| NEW-TOPUP-001 | Between accounts top-up | `/legacy/topup/between` | MVP_PARTIAL_PENDING | BP-TRF-001 | yes |
| NEW-TOPUP-002 | External card top-up | `/legacy/topup/card` | MVP | BP-TOPUP-001 | yes |
| NEW-WD-001 | Withdraw to card | `/legacy/withdraw/card` | MVP | BP-WD-001 | yes |
| NEW-WD-002 | Withdraw to phone | `/legacy/withdraw/phone` | MVP | BP-WD-002 | yes |
| NEW-WD-003 | P2P Cashhello user | `/legacy/withdraw/cashhello-user` | MVP_PARTIAL_PENDING | BP-P2P-001 | yes |
| NEW-WD-004 | Withdraw processing/success | `/legacy/withdraw/loading` | MVP | BP-WD-001,BP-WD-002,BP-P2P-001 | yes |
| NEW-SHEET-TOPUP-001 | Top-up method sheet | `OVERLAY:home/topup` | MVP | BP-TOPUP-001 | yes |
| NEW-SHEET-WD-001 | Withdraw method sheet | `OVERLAY:home/withdraw` | MVP | BP-WD-001,BP-WD-002,BP-P2P-001 | yes |
| NEW-SUPPORT-001 | Support contact sheet | `OVERLAY:global/support` | MVP | BP-SUPPORT-002 | config_only |
| NEW-PAY-SHEET-001 | Payment category sheet | `OVERLAY:payment/category` | MVP | BP-PAY-001 | yes |
| NEW-HIST-SHEET-001 | History date sheet | `OVERLAY:history/date` | MVP | BP-HIST-001 | yes |
| NEW-HIST-SHEET-002 | History action sheet | `OVERLAY:history/action` | MVP_PARTIAL_PENDING | BP-HIST-002 | yes |
| NEW-PROF-SHEET-001 | Logout confirmation | `OVERLAY:profile/logout` | MVP | BP-PROFILE-002 | yes |
| NEW-PROF-SHEET-002 | Delete account confirmation | `OVERLAY:profile/delete` | MVP | BP-PROFILE-002 | yes |
| NEW-ORPH-001 | Search (orphaned) | `/legacy/search` | ORPHANED | — | no |
| NEW-ORPH-002 | Accounts list (orphaned) | `/legacy/accounts` | ORPHANED | BP-ACC-001 | no |
| NEW-OLD-CASH-TOPUP | Cash top-up (old/unreachable) | `/legacy/topup/cash` | OUT_OF_MVP | BP-TOPUP-002 | no |
| NEW-OLD-CASH-WD | Cash withdraw (old/unreachable) | `/legacy/withdraw/cash` | OUT_OF_MVP | BP-WD-003 | no |
| NEW-OLD-CARD-001 | Card product (orphaned) | `/legacy/card` | PARKED_ILYA | BP-CARD-001 | no |
| NEW-OLD-MSG-001 | Messages (orphaned) | `/legacy/messages` | LATER | BP-SUPPORT-001 | no |
| NEW-DEV-001 | Foundation lab | `/dev/foundation` | DEV_ONLY | — | no |
