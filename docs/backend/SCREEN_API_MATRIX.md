# Screen → API matrix (NEW app)

**Audit date:** 2026-09-01  
**Built from:** [NEW_APP_ACTION_CATALOG.json](../business/NEW_APP_ACTION_CATALOG.json)  
**Machine-readable:** [SCREEN_API_MATRIX.json](./SCREEN_API_MATRIX.json)

> **No screenshot_ref.** Previous Cashhello screenshots are deprecated and must not be used.

| action_id | screen_id | route | control | business_purpose | mvp_status | backend_needed | backend_capability |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NEW-ACT-TAB-01 | NEW-HOME-002 | /legacy/home | Tab: Главная | Return to home hub | MVP_APPROVED | no | — |
| NEW-ACT-TAB-02 | NEW-PAY-001 | /legacy/payment | Tab: Оплата | Open payment catalog | MVP_APPROVED | yes | catalog.browse |
| NEW-ACT-TAB-03 | NEW-QR-001 | /legacy/qr | Tab: QR | Navigate to QR receive screen | FUTURE | no | — |
| NEW-ACT-TAB-04 | NEW-HIST-001 | /legacy/history | Tab: История | View transaction history | MVP_APPROVED | yes | transactions.query |
| NEW-ACT-TAB-05 | NEW-PROF-001 | /legacy/profile | Tab: Профиль | Open profile and settings | MVP_APPROVED | yes | users.me |
| NEW-ACT-SUP-01 | NEW-SUPPORT-001 | OVERLAY:global/support | Support FAB | Access external customer support | MVP_APPROVED | config_only | support.contactConfig |
| NEW-ACT-SUP-02 | NEW-SUPPORT-001 | OVERLAY:global/support | Telegram | Contact support via Telegram | MVP_APPROVED | config_only | support.contactConfig |
| NEW-ACT-SUP-03 | NEW-SUPPORT-001 | OVERLAY:global/support | WhatsApp | Contact support via WhatsApp | MVP_APPROVED | config_only | support.contactConfig |
| NEW-ACT-HOME-G01 | NEW-HOME-001 | /legacy/home?guest=1 | Cashhello brand | Reset to home root | MVP_APPROVED | no | — |
| NEW-ACT-HOME-G02 | NEW-HOME-001 | /legacy/home?guest=1 | Profile avatar | Start login/registration | MVP_APPROVED | yes | auth.resolvePhone |
| NEW-ACT-HOME-G03 | NEW-HOME-001 | /legacy/home?guest=1 | Show/hide balance | Privacy toggle for balance display | MVP_APPROVED | no | — |
| NEW-ACT-HOME-G04 | NEW-HOME-001 | /legacy/home?guest=1 | Пополнить | User selects wallet top-up source | MVP_APPROVED | yes | topup.methods |
| NEW-ACT-HOME-G05 | NEW-HOME-001 | /legacy/home?guest=1 | Вывести | User selects withdraw destination | MVP_APPROVED | yes | withdraw.methods |
| NEW-ACT-HOME-G06 | NEW-HOME-001 | /legacy/home?guest=1 | Payments tab: Последние | Show recent payments preview | MVP_APPROVED | no | — |
| NEW-ACT-HOME-G07 | NEW-HOME-001 | /legacy/home?guest=1 | Payments tab: Все | Browse full payment catalog | MVP_APPROVED | yes | catalog.browse |
| NEW-ACT-HOME-G08 | NEW-HOME-001 | /legacy/home?guest=1 | Payments tab: История | View payment history | MVP_APPROVED | yes | transactions.query |
| NEW-ACT-HOME-G09 | NEW-HOME-001 | /legacy/home?guest=1 | Guest recent operation row | Tease recent activity; requires login | MVP_APPROVED | no | — |
| NEW-ACT-HOME-G10 | NEW-HOME-001 | /legacy/home?guest=1 | Войти | Primary login/register entry | MVP_APPROVED | yes | auth.resolvePhone |
| NEW-ACT-HOME-A01 | NEW-HOME-002 | /legacy/home | Пополнить | Top up wallet from card or own accounts | MVP_APPROVED | yes | topup.methods |
| NEW-ACT-HOME-A02 | NEW-HOME-002 | /legacy/home | Вывести | Withdraw or send funds | MVP_APPROVED | yes | withdraw.methods |
| NEW-ACT-HOME-A03 | NEW-HOME-002 | /legacy/home | Payments: Все | Open full service catalog | MVP_APPROVED | yes | catalog.browse |
| NEW-ACT-HOME-A04 | NEW-HOME-002 | /legacy/home | Payments: История | View transactions | MVP_APPROVED | yes | transactions.query |
| NEW-ACT-HOME-A05 | NEW-HOME-002 | /legacy/home | Recent operation row | Repeat payment to same service | MVP_APPROVED | yes | payments.service |
| NEW-ACT-TOP-S01 | NEW-SHEET-TOPUP-001 | OVERLAY:home/topup | Между счетами | Transfer between own accounts to top up | MVP_PARTIAL_PENDING | yes | transfers.internal |
| NEW-ACT-TOP-S02 | NEW-SHEET-TOPUP-001 | OVERLAY:home/topup | Карта другого банка | Top up from external card | MVP_APPROVED | yes | topup.card |
| NEW-ACT-TOP-S03 | NEW-SHEET-TOPUP-001 | OVERLAY:home/topup | Закрыть | Cancel method selection | MVP_APPROVED | no | — |
| NEW-ACT-WD-S01 | NEW-SHEET-WD-001 | OVERLAY:home/withdraw | На карту | Withdraw to external bank card | MVP_APPROVED | yes | withdraw.create |
| NEW-ACT-WD-S02 | NEW-SHEET-WD-001 | OVERLAY:home/withdraw | На телефон | Withdraw to phone wallet | MVP_APPROVED | yes | withdraw.create |
| NEW-ACT-WD-S03 | NEW-SHEET-WD-001 | OVERLAY:home/withdraw | Пользователю Cashhello | P2P transfer to Cashello user by phone | MVP_PARTIAL_PENDING | yes | p2p.lookupRecipient |
| NEW-ACT-TOP-01 | NEW-TOPUP-001 | /legacy/topup/between | Подтвердить перевод | Execute internal account transfer | MVP_PARTIAL_PENDING | yes | transfers.internal |
| NEW-ACT-TOP-02 | NEW-TOPUP-002 | /legacy/topup/card | Пополнить | Charge external card to credit account | MVP_APPROVED | yes | topup.card |
| NEW-ACT-WD-01 | NEW-WD-001 | /legacy/withdraw/card | Отправить | Submit card withdrawal | MVP_APPROVED | yes | withdraw.create |
| NEW-ACT-WD-02 | NEW-WD-002 | /legacy/withdraw/phone | Отправить | Submit phone withdrawal | MVP_APPROVED | yes | withdraw.create |
| NEW-ACT-WD-03 | NEW-WD-003 | /legacy/withdraw/cashhello-user | Найти получателя | Find Cashello user by phone for P2P | MVP_PARTIAL_PENDING | yes | p2p.lookupRecipient |
| NEW-ACT-WD-04 | NEW-WD-003 | /legacy/withdraw/cashhello-user | Отправить | Execute P2P transfer | MVP_PARTIAL_PENDING | yes | p2p.create |
| NEW-ACT-WD-05 | NEW-WD-004 | /legacy/withdraw/loading | Готово / Закрыть | Return home after operation | MVP_APPROVED | no | — |
| NEW-ACT-PAY-01 | NEW-PAY-001 | /legacy/payment | Category row | Filter services by category | MVP_APPROVED | yes | catalog.browse |
| NEW-ACT-PAY-02 | NEW-PAY-001 | /legacy/payment | Service row | Open service payment form | MVP_APPROVED | yes | payments.serviceDetail |
| NEW-ACT-PAY-03 | NEW-PAY-001 | /legacy/payment | Search input | Find service by name | MVP_APPROVED | yes | catalog.search |
| NEW-ACT-PAY-04 | NEW-PAY-001 | /legacy/payment | Favorites tab | Show favorite services | MVP_APPROVED | yes | catalog.favorites |
| NEW-ACT-PAY-05 | NEW-PAY-002 | /legacy/payment/[id] | Оплатить | Pay utility/service from account | MVP_APPROVED | yes | payments.service |
| NEW-ACT-PAY-06 | NEW-PAY-002 | /legacy/payment/[id] | Favorite heart | Save service to favorites | MVP_APPROVED | yes | catalog.favorites |
| NEW-ACT-PAY-07 | NEW-PAY-002 | /legacy/payment/[id] | Pay-from account picker | Select funding account including bonus | MVP_APPROVED | yes | accounts.list |
| NEW-ACT-QR-01 | NEW-QR-001 | /legacy/qr | Сгенерировать | Generate receive QR for amount | FUTURE | no | — |
| NEW-ACT-QR-02 | NEW-QR-001 | /legacy/qr | Сбросить | Clear QR form | FUTURE | no | — |
| NEW-ACT-HIST-01 | NEW-HIST-001 | /legacy/history | Date filter trigger | Filter history by date range | MVP_APPROVED | yes | transactions.query |
| NEW-ACT-HIST-02 | NEW-HIST-001 | /legacy/history | Debit operation row | Actions on past debit operation | MVP_PARTIAL_PENDING | yes | transactions.detail |
| NEW-ACT-HIST-03 | NEW-HIST-SHEET-002 | OVERLAY:history/action | Повторить | Repeat similar operation | MVP_PARTIAL_PENDING | yes | transactions.repeat |
| NEW-ACT-HIST-04 | NEW-HIST-SHEET-002 | OVERLAY:history/action | Поделиться чеком | View/share receipt for operation | MVP_APPROVED | yes | transactions.receipt |
| NEW-ACT-HIST-05 | NEW-HIST-002 | /legacy/history/[id] | Чек | Open full receipt view | MVP_APPROVED | yes | transactions.receipt |
| NEW-ACT-PROF-01 | NEW-PROF-001 | /legacy/profile | Подробнее (status) | View identification/KYC status detail | PARKED_ILYA | no | — |
| NEW-ACT-PROF-02 | NEW-PROF-001 | /legacy/profile | Push notifications toggle | Enable/disable push notifications | PARKED_ILYA | no | notifications.preferences |
| NEW-ACT-PROF-03 | NEW-PROF-001 | /legacy/profile | Сменить PIN | Change app PIN | MVP_APPROVED | yes | auth.changePin |
| NEW-ACT-PROF-04 | NEW-PROF-001 | /legacy/profile | Документы | View legal documents placeholder | STUB | no | — |
| NEW-ACT-PROF-05 | NEW-PROF-001 | /legacy/profile | Выйти | End session | MVP_APPROVED | yes | auth.logout |
| NEW-ACT-PROF-06 | NEW-PROF-001 | /legacy/profile | Удалить аккаунт | Delete account and restart auth | MVP_APPROVED | yes | users.delete |
| NEW-ACT-PROF-07 | NEW-PROF-SHEET-001 | OVERLAY:profile/logout | Подтвердить выход | Confirm logout | MVP_APPROVED | yes | auth.logout |
| NEW-ACT-PROF-08 | NEW-PROF-003 | /legacy/profile/pin | PIN keypad digits | Enter new PIN twice | MVP_APPROVED | yes | auth.changePin |
| NEW-ACT-AUTH-01 | NEW-AUTH-003 | /legacy/auth?qaStep=iin | Continue phone/IIN | Submit identifier to start auth | MVP_APPROVED | yes | auth.resolvePhone |
| NEW-ACT-AUTH-02 | NEW-AUTH-011 | /legacy/auth | Verify OTP | Verify WhatsApp OTP code | MVP_APPROVED | yes | auth.verifyOtp |
| NEW-ACT-AUTH-03 | NEW-AUTH-012 | /legacy/auth | PIN create digits | Create new PIN | MVP_APPROVED | yes | auth.setPin |
| NEW-ACT-AUTH-04 | NEW-AUTH-015 | /legacy/auth | PIN login digits | Returning user authentication | MVP_APPROVED | yes | auth.loginPin |
| NEW-ACT-AUTH-05 | NEW-AUTH-003 | /legacy/auth | Exit auth | Cancel auth and return to guest browse | MVP_APPROVED | no | — |
| NEW-ACT-KYC-01 | NEW-AUTH-005 | /legacy/auth | Capture face | KYC face verification prototype | PARKED_ILYA | no | — |
