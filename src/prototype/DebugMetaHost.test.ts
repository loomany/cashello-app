import { DEBUG_HOTSPOT_LAYOUT } from '@/prototype/DebugMetaHost';

describe('QA-004 DebugMetaHost hotspot placement', () => {
  it('avoids top-left (legacy back) and top-right (home actions / filter / cancel)', () => {
    expect(DEBUG_HOTSPOT_LAYOUT.left).toBe(0);
    expect(DEBUG_HOTSPOT_LAYOUT.topPercent).toBe('50%');
    expect(DEBUG_HOTSPOT_LAYOUT.width).toBeLessThanOrEqual(32);
    expect(DEBUG_HOTSPOT_LAYOUT.height).toBeLessThanOrEqual(56);
    // Must not be anchored to top/right corners used by product chrome.
    expect('right' in DEBUG_HOTSPOT_LAYOUT).toBe(false);
    expect('top' in DEBUG_HOTSPOT_LAYOUT && typeof (DEBUG_HOTSPOT_LAYOUT as { top?: number }).top === 'number').toBe(
      false,
    );
  });
});
