import { qrCopy } from '@/features/legacyQr/copy';
import { buildReceiveQrPayload, QR_BRIDGES } from '@/features/legacyQr/mockData';

describe('LOCAL_DRAFT receive QR', () => {
  it('wires bridge and copy', () => {
    expect(QR_BRIDGES.root).toBe('/legacy/qr');
    expect(qrCopy.hero).toBe('Получите оплату по единому QR');
    expect(qrCopy.generateCta).toBe('Сгенерировать QR');
  });

  it('builds pay payload from amount', () => {
    expect(buildReceiveQrPayload(10000)).toBe('cashhello://pay?amount=10000&currency=KZT');
  });
});
