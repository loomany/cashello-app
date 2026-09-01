# NEW app action catalog

**Audit date:** 2026-09-01  
**Scope:** interactive controls on **current reachable** new app only  
**Machine-readable:** [NEW_APP_ACTION_CATALOG.json](./NEW_APP_ACTION_CATALOG.json)

Each action documents **what it does**, **where it goes**, and **why** (business purpose).

## Summary

| mvp_status | Actions |
| --- | ---: |
| MVP | 61 |
| MVP_PARTIAL_PENDING | 7 |
| FUTURE | 3 |
| PARKED_ILYA | 3 |
| STUB | 1 |
| **Total** | **76** |

| action_id | screen_id | control | business_purpose | destination | mvp_status |
| --- | --- | --- | --- | --- | --- |
| NEW-ACT-TAB-01 | NEW-HOME-002 | tab: Tab: Главная | Return to home hub | /legacy/home | MVP |
| NEW-ACT-TAB-02 | NEW-PAY-001 | tab: Tab: Оплата | Open payment catalog | /legacy/payment | MVP |
| NEW-ACT-TAB-03 | NEW-QR-001 | tab: Tab: QR | Navigate to QR receive screen | /legacy/qr | FUTURE |
| NEW-ACT-TAB-04 | NEW-HIST-001 | tab: Tab: История | View transaction history | /legacy/history | MVP |
| NEW-ACT-TAB-05 | NEW-PROF-001 | tab: Tab: Профиль | Open profile and settings | /legacy/profile | MVP |
| NEW-ACT-SUP-01 | NEW-SUPPORT-001 | fab: Support FAB | Access external customer support | NEW-SUPPORT-001 | MVP |
| NEW-ACT-SUP-02 | NEW-SUPPORT-001 | sheet_option: Telegram | Contact support via Telegram | EXTERNAL:telegram | MVP |
| NEW-ACT-SUP-03 | NEW-SUPPORT-001 | sheet_option: WhatsApp | Contact support via WhatsApp | EXTERNAL:whatsapp | MVP |
| NEW-ACT-SUP-04 | NEW-SUPPORT-001 | icon_button: Закрыть | Dismiss support channel picker | PREVIOUS_SCREEN | MVP |
| NEW-ACT-SUP-GAP-01 | NEW-SUPPORT-001 | sheet_option: Phone support (absent) | Owner target includes phone support per Q-SUPPORT-001 | N/A | MVP |
| NEW-ACT-HOME-G01 | NEW-HOME-001 | button: Cashhello brand | Reset to home root | /legacy/home?guest=1 | MVP |
| NEW-ACT-HOME-G02 | NEW-HOME-001 | icon_button: Profile avatar | Start login/registration | /legacy/auth?qaStep=iin | MVP |
| NEW-ACT-HOME-G03 | NEW-HOME-001 | toggle: Show/hide balance | Privacy toggle for balance display | LOCAL:balance visibility | MVP |
| NEW-ACT-HOME-G04 | NEW-HOME-001 | button: Пополнить | User selects wallet top-up source | NEW-SHEET-TOPUP-001 | MVP |
| NEW-ACT-HOME-G05 | NEW-HOME-001 | button: Вывести | User selects withdraw destination | NEW-SHEET-WD-001 | MVP |
| NEW-ACT-HOME-G06 | NEW-HOME-001 | tab: Payments tab: Последние | Show recent payments preview | LOCAL:recent tab | MVP |
| NEW-ACT-HOME-G07 | NEW-HOME-001 | tab: Payments tab: Все | Browse full payment catalog | /legacy/auth?qaStep=iin | MVP |
| NEW-ACT-HOME-G08 | NEW-HOME-001 | tab: Payments tab: История | View payment history | /legacy/auth?qaStep=iin | MVP |
| NEW-ACT-HOME-G09 | NEW-HOME-001 | list_row: Guest recent operation row | Tease recent activity; requires login | /legacy/auth?qaStep=iin | MVP |
| NEW-ACT-HOME-G10 | NEW-HOME-001 | cta: Войти | Primary login/register entry | /legacy/auth?qaStep=iin | MVP |
| NEW-ACT-HOME-A01 | NEW-HOME-002 | button: Пополнить | Top up wallet from card or own accounts | NEW-SHEET-TOPUP-001 | MVP |
| NEW-ACT-HOME-A02 | NEW-HOME-002 | button: Вывести | Withdraw or send funds | NEW-SHEET-WD-001 | MVP |
| NEW-ACT-HOME-A03 | NEW-HOME-002 | tab: Payments: Все | Open full service catalog | /legacy/payment | MVP |
| NEW-ACT-HOME-A04 | NEW-HOME-002 | tab: Payments: История | View transactions | /legacy/history | MVP |
| NEW-ACT-HOME-A05 | NEW-HOME-002 | list_row: Recent operation row | Repeat payment to same service | /legacy/payment/[id] | MVP |
| NEW-ACT-TOP-S01 | NEW-SHEET-TOPUP-001 | sheet_option: Между счетами | Transfer between own accounts to top up | /legacy/topup/between | MVP_PARTIAL_PENDING |
| NEW-ACT-TOP-S02 | NEW-SHEET-TOPUP-001 | sheet_option: Карта другого банка | Top up from external card | /legacy/topup/card | MVP |
| NEW-ACT-TOP-S03 | NEW-SHEET-TOPUP-001 | icon_button: Закрыть | Cancel method selection | NEW-HOME-001|NEW-HOME-002 | MVP |
| NEW-ACT-WD-S01 | NEW-SHEET-WD-001 | sheet_option: На карту | Withdraw to external bank card | /legacy/withdraw/card | MVP |
| NEW-ACT-WD-S02 | NEW-SHEET-WD-001 | sheet_option: На телефон | Withdraw to phone wallet | /legacy/withdraw/phone | MVP |
| NEW-ACT-WD-S03 | NEW-SHEET-WD-001 | sheet_option: Пользователю Cashhello | P2P transfer to Cashello user by phone | /legacy/withdraw/cashhello-user | MVP_PARTIAL_PENDING |
| NEW-ACT-WD-S04 | NEW-SHEET-WD-001 | icon_button: Закрыть | Cancel withdraw method selection | NEW-HOME-001|NEW-HOME-002 | MVP |
| NEW-ACT-WD-S05 | NEW-SHEET-WD-001 | backdrop: Backdrop dismiss | Dismiss withdraw sheet via backdrop tap | NEW-HOME-001|NEW-HOME-002 | MVP |
| NEW-ACT-TOP-S04 | NEW-SHEET-TOPUP-001 | backdrop: Backdrop dismiss | Dismiss top-up sheet via backdrop tap | NEW-HOME-001|NEW-HOME-002 | MVP |
| NEW-ACT-TOP-01 | NEW-TOPUP-001 | submit: Подтвердить перевод | Execute internal account transfer | /legacy/home | MVP_PARTIAL_PENDING |
| NEW-ACT-TOP-02 | NEW-TOPUP-002 | submit: Пополнить | Charge external card to credit account | /legacy/home | MVP |
| NEW-ACT-WD-01 | NEW-WD-001 | submit: Отправить | Submit card withdrawal | /legacy/withdraw/loading | MVP |
| NEW-ACT-WD-02 | NEW-WD-002 | submit: Отправить | Submit phone withdrawal | /legacy/withdraw/loading | MVP |
| NEW-ACT-WD-03 | NEW-WD-003 | submit: Найти получателя | Find Cashello user by phone for P2P | LOCAL:recipient preview | MVP_PARTIAL_PENDING |
| NEW-ACT-WD-04 | NEW-WD-003 | submit: Отправить | Execute P2P transfer | /legacy/withdraw/loading | MVP_PARTIAL_PENDING |
| NEW-ACT-WD-05 | NEW-WD-004 | button: Готово / Закрыть | Return home after operation | /legacy/home | MVP |
| NEW-ACT-PAY-01 | NEW-PAY-001 | list_row: Category row | Filter services by category | NEW-PAY-SHEET-001 | MVP |
| NEW-ACT-PAY-02 | NEW-PAY-001 | list_row: Service row | Open service payment form | /legacy/payment/[id] | MVP |
| NEW-ACT-PAY-03 | NEW-PAY-001 | input: Search input | Find service by name | LOCAL:filtered list | MVP |
| NEW-ACT-PAY-04 | NEW-PAY-001 | tab: Favorites tab | Show favorite services | LOCAL|/legacy/auth?qaStep=iin | MVP |
| NEW-ACT-PAY-05 | NEW-PAY-002 | cta: Оплатить | Pay utility/service from account | ALERT|/legacy/auth?qaStep=iin | MVP |
| NEW-ACT-PAY-06 | NEW-PAY-002 | toggle: Favorite heart | Save service to favorites | LOCAL|login | MVP |
| NEW-ACT-PAY-07 | NEW-PAY-002 | picker: Pay-from account picker | Select funding account including bonus | SHEET:account|login | MVP |
| NEW-ACT-PAY-08 | NEW-PAY-SHEET-001 | sheet_option: Category select row | Filter payment catalog by category | NEW-PAY-001 | MVP |
| NEW-ACT-PAY-09 | NEW-PAY-SHEET-001 | icon_button: Закрыть | Close category filter without change | NEW-PAY-001 | MVP |
| NEW-ACT-PAY-10 | NEW-PAY-SHEET-001 | backdrop: Backdrop dismiss | Dismiss category sheet via backdrop | NEW-PAY-001 | MVP |
| NEW-ACT-QR-01 | NEW-QR-001 | cta: Сгенерировать | Generate receive QR for amount | LOCAL:qr display|login | FUTURE |
| NEW-ACT-QR-02 | NEW-QR-001 | button: Сбросить | Clear QR form | LOCAL:form reset | FUTURE |
| NEW-ACT-HIST-01 | NEW-HIST-001 | button: Date filter trigger | Filter history by date range | NEW-HIST-SHEET-001 | MVP |
| NEW-ACT-HIST-02 | NEW-HIST-001 | list_row: Debit operation row | Actions on past debit operation | NEW-HIST-SHEET-002 | MVP_PARTIAL_PENDING |
| NEW-ACT-HIST-03 | NEW-HIST-SHEET-002 | sheet_option: Повторить | Repeat similar operation | /legacy/withdraw/card|/legacy/payment/[id] | MVP_PARTIAL_PENDING |
| NEW-ACT-HIST-04 | NEW-HIST-SHEET-002 | sheet_option: Поделиться чеком | View/share receipt for operation | /legacy/history/[id] | MVP |
| NEW-ACT-HIST-05 | NEW-HIST-002 | link: Чек | Open full receipt view | /legacy/history/[id]/receipt | MVP |
| NEW-ACT-PROF-01 | NEW-PROF-001 | link: Подробнее (status) | View identification/KYC status detail | /legacy/profile/status | PARKED_ILYA |
| NEW-ACT-PROF-02 | NEW-PROF-001 | toggle: Push notifications toggle | Enable/disable push notifications | LOCAL:push preference | PARKED_ILYA |
| NEW-ACT-PROF-03 | NEW-PROF-001 | list_row: Сменить PIN | Change app PIN | /legacy/profile/pin | MVP |
| NEW-ACT-PROF-04 | NEW-PROF-001 | list_row: Документы | View legal documents placeholder | /legacy/stub/documents | STUB |
| NEW-ACT-PROF-05 | NEW-PROF-001 | list_row: Выйти | End session | NEW-PROF-SHEET-001 | MVP |
| NEW-ACT-PROF-06 | NEW-PROF-001 | list_row: Удалить аккаунт | Delete account and restart auth | NEW-PROF-SHEET-002 | MVP |
| NEW-ACT-PROF-07 | NEW-PROF-SHEET-001 | modal_action: Подтвердить выход | Confirm logout and revoke session | /legacy/home?guest=1 | MVP |
| NEW-ACT-PROF-08 | NEW-PROF-003 | picker: PIN keypad digits | Enter new PIN twice | /legacy/profile | MVP |
| NEW-ACT-PROF-09 | NEW-PROF-SHEET-002 | modal_action: Подтвердить удаление | Confirm account deletion and restart auth | /legacy/auth | MVP |
| NEW-ACT-PROF-10 | NEW-PROF-SHEET-001 | modal_action: Отмена выхода | Cancel logout | NEW-PROF-001 | MVP |
| NEW-ACT-PROF-11 | NEW-PROF-SHEET-002 | modal_action: Отмена удаления | Cancel account deletion | NEW-PROF-001 | MVP |
| NEW-ACT-PROF-GAP-01 | NEW-PROF-001 | list_row: Change phone (absent) | Change registered phone number | N/A | MVP_TARGET |
| NEW-ACT-AUTH-01 | NEW-AUTH-003 | submit: Submit phone (loginAction) | Submit phone to receive WhatsApp OTP — normal auth path | NEW-AUTH-011 | MVP |
| NEW-ACT-AUTH-02 | NEW-AUTH-011 | submit: Verify OTP | Verify WhatsApp OTP code | NEW-AUTH-012|NEW-AUTH-015 | MVP |
| NEW-ACT-AUTH-03 | NEW-AUTH-012 | picker: PIN create digits | Create new PIN | NEW-AUTH-013 | MVP |
| NEW-ACT-AUTH-04 | NEW-AUTH-015 | picker: PIN login digits | Returning user authentication | /legacy/home | MVP |
| NEW-ACT-AUTH-05 | NEW-AUTH-003 | back: Exit auth | Cancel auth and return to guest browse | /legacy/home?guest=1 | MVP |
| NEW-ACT-KYC-01 | NEW-AUTH-005 | button: Capture face | KYC face verification prototype | NEW-AUTH-007 | PARKED_ILYA |
