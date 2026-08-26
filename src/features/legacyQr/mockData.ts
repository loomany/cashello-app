export const QR_BRIDGES = {
  root: '/legacy/qr',
} as const;

/** LOCAL_DRAFT payload encoded into the QR. */
export function buildReceiveQrPayload(amountKzt: number): string {
  return `cashhello://pay?amount=${amountKzt}&currency=KZT`;
}
