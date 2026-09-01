# Current Cashello flow map

These diagrams describe **current routes and runtime behavior**, not approved production rules.

## Guest access matrix

| Surface                 | Visible/browsable to guest | Current click result                           | Screen                 |
| ----------------------- | -------------------------- | ---------------------------------------------- | ---------------------- |
| Guest Home              | YES                        | —                                              | HOME-001               |
| Balances                | YES — zeros                | Demo authorized values                         | HOME-001 / LGC-SCR-025 |
| Top-up sheet            | YES                        | Method click → auth                            | CAS-HOME-003           |
| Withdraw sheet          | YES                        | Method click → auth                            | CAS-HOME-004           |
| Payment catalog         | YES                        | Browse allowed                                 | PAY-001                |
| Payment form            | YES                        | Pay/favorite/account → auth                    | PAY-002                |
| History list            | YES                        | Browse allowed; repeat/share → auth            | LGC-SCR-111            |
| QR                      | YES                        | Amount allowed; generate → auth                | QR-001                 |
| Profile                 | NO                         | Header/tab → auth                              | LGC-SCR-066            |
| Direct money deep links | YES in current code        | No route-level guard                           | topup/**, withdraw/**  |
| Support FAB             | YES                        | Opens sheet; Telegram/WhatsApp → Alert «Скоро» | CAS-SUPPORT-002        |

## Global navigation

```mermaid
flowchart LR
  G["HOME-001 Guest"] -->|"ACT-HOME-001-12"| AUTH["CAS-AUTH-003"]
  H["LGC-SCR-025 Authorized Home"] -->|"tabs"| PAY["PAY-001"]
  H -->|"tabs"| QR["QR-001"]
  H -->|"tabs"| HIST["LGC-SCR-111"]
  H -->|"tabs"| PROF["LGC-SCR-066"]
  H -->|"account card"| ACC["LGC-SCR-029"]
  G -->|"ACT-HOME-001-13"| SUP["CAS-SUPPORT-002"]
  H -->|"ACT-LGC-SCR-025-17"| SUP
```

## Guest flow

```mermaid
flowchart LR
  HOME["HOME-001"] -->|"ACT-HOME-001-04"| TS["CAS-HOME-003"]
  HOME -->|"ACT-HOME-001-05"| WS["CAS-HOME-004"]
  HOME -->|"browse"| PAY["PAY-001 / PAY-002"]
  HOME -->|"browse"| HIST["LGC-SCR-111"]
  HOME -->|"ACT-HOME-001-12"| AUTH["CAS-AUTH-003"]
  TS -->|"method: guest gate"| AUTH
  WS -->|"method: guest gate"| AUTH
  PAY -->|"Оплатить"| AUTH
  HIST -->|"repeat/share"| AUTH
  QR["QR-001"] -->|"generate"| AUTH
```

## Authentication

```mermaid
flowchart LR
  ENTRY["CAS-AUTH-003"] -->|"ACT-CAS-AUTH-003-04"| OTP["CAS-AUTH-011"]
  OTP -->|"4 digits"| PIN1["CAS-AUTH-012"]
  PIN1 -->|"6 digits"| PIN2["CAS-AUTH-013"]
  PIN2 -->|"match"| HOME["LGC-SCR-025"]
  PIN2 -->|"mismatch"| ERR["CAS-AUTH-014"]
  LOGIN["CAS-AUTH-015 QA-only"] -->|"any 6 digits"| HOME
  KYC["CAS-AUTH-004..009 QA-only"] -. "not on normal path" .-> ENTRY
```

## Authorized Home

```mermaid
flowchart LR
  HOME["LGC-SCR-025"] -->|"ACT-LGC-SCR-025-04"| TOP["CAS-HOME-003"]
  HOME -->|"ACT-LGC-SCR-025-05"| WD["CAS-HOME-004"]
  HOME -->|"services"| PAY["PAY-001"]
  HOME -->|"history"| HIST["LGC-SCR-111"]
  HOME -->|"tabs"| PROF["LGC-SCR-066"]
  TOP --> BETWEEN["LGC-SCR-069"]
  TOP --> CARDTOP["LGC-SCR-085"]
  WD --> CARDWD["WD-002"]
  WD --> PHONE["WD-004"]
  WD --> P2P["CAS-WD-005 blocked"]
```

## Top-up and own-account transfer

```mermaid
flowchart LR
  METHODS["LGC-SCR-040"] -->|"Between"| FORM["LGC-SCR-069"]
  FORM -->|"pick account"| PICK["LGC-SCR-071"]
  FORM -->|"amount"| FILLED["LGC-SCR-073"]
  FILLED -->|"ACT-LGC-SCR-073-08"| HOME["LGC-SCR-025"]
  METHODS -->|"External card"| CARD["LGC-SCR-085"]
  CARD --> SAVED["CAS-TOPUP-001"]
  CARD -->|"fixed mock success"| HOME
  CASH["LGC-SCR-074 orphan"] --> MAP["LGC-SCR-080"]
  MAP --> SELECTED["LGC-SCR-081"]
  SELECTED -->|"fixed 8000 pending"| CASH
```

## Withdraw

```mermaid
flowchart LR
  METHODS["LGC-SCR-041"] --> CARD["WD-002"]
  METHODS --> PHONE["WD-004"]
  METHODS --> CASH["LGC-SCR-105"]
  CARD -->|"3 sec local timer"| LOAD["LGC-SCR-098"]
  PHONE -->|"3 sec local timer"| LOAD
  CASH --> MAP["LGC-SCR-106 / 108"]
  MAP --> AMOUNT["LGC-SCR-109 / 096"]
  AMOUNT --> CONFIRM["LGC-SCR-097"]
  CONFIRM --> LOAD
  LOAD --> SUCCESS["WD-003"]
  LOAD --> ERROR["LGC-SCR-099"]
  LOAD --> PROCESSING["WD-003 processing"]
```

## Service payment

```mermaid
flowchart LR
  CAT["PAY-001"] --> CATEGORY["CAS-PAY-001"]
  CAT --> SERVICE["PAY-002"]
  SERVICE --> ACCOUNT["CAS-PAY-002"]
  SERVICE -->|"guest pay"| AUTH["CAS-AUTH-003"]
  SERVICE -->|"authorized: 900 ms"| ALERT["Alert success; no ledger/history"]
```

## QR

```mermaid
flowchart LR
  FORM["QR-001 amount"] -->|"guest generate"| AUTH["CAS-AUTH-003"]
  FORM -->|"authorized generate"| GENERATED["QR-001 generated local URI"]
  GENERATED -->|"New amount"| FORM
```

## Profile / KYC

```mermaid
flowchart LR
  PROFILE["LGC-SCR-066"] --> STATUS["LGC-SCR-068"]
  PROFILE --> PIN["LGC-SCR-124"]
  PROFILE --> DOCS["CAS-STUB-006"]
  PROFILE --> LOGOUT["CAS-PROFILE-001"]
  PROFILE --> DELETE["CAS-PROFILE-002"]
  PHONE["LGC-SCR-122 orphan route"] --> VERIFY["LGC-SCR-123"]
  STATUS -->|"expand: Alert"| STATUS
  KYC["CAS-AUTH-004..009"] -. "QA-only, not linked" .-> STATUS
```

## Support FAB

```mermaid
flowchart LR
  ANY["Any /legacy/* screen"] -->|"ACT-GLOBAL-SUPPORT-01"| SHEET["CAS-SUPPORT-002"]
  SHEET -->|"Telegram"| ALERT["Alert Скоро — URL null"]
  SHEET -->|"WhatsApp"| ALERT
  SHEET -->|"close/overlay"| ANY
```

## Error-path classification

- **BUSINESS_DECISION:** money availability, cancellation, expiry, limits, fees, late reversals.
- **TECHNICAL_DECISION:** transport retries, idempotency implementation, webhook deduplication mechanics, observability.
- **BOTH:** timeout/unknown result UX, duplicate submissions, recovery after app close, manual review.
- Shared owner decisions: `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`.

## Post-design Home navigation (5977543)

These are navigation transitions within existing business processes, not new process candidates.

- **BP-AUTH-001** (alternate entry): Guest Home bonus row → Auth (`ACT-HOME-001-14`). PROTOTYPE_UI_ONLY — «+500 Б» copy is not production policy.
- **BP-PAY-001** (alternate entry): Authorized Home recent-operation row → prefilled `PAY-002` (`ACT-LGC-SCR-025-18`…`025-25`, `ACT-LGC-SCR-026-17`…`026-24`, `ACT-PAY-002-15`). CURRENT_MOCK_BEHAVIOR — preview catalog rows, not real transaction history.
- **BP-HIST-001** (unchanged): «См. все» on Home (`ACT-LGC-SCR-025-10`, `ACT-LGC-SCR-026-10`) still routes to history.
- Removed from current product: Home services preview rows, Home history preview rows, Home `HistoryActionSheet` overlay screen record (`CAS-HOME-005`). `HistoryActionSheet` remains on history screens (`CAS-HIST-002`).
