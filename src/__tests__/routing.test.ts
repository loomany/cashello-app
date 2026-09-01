import { PUBLIC_ROOT_HREF } from '@/app/publicRoot';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';

describe('public root routing', () => {
  it('lands on guest Home instead of auth splash', () => {
    expect(PUBLIC_ROOT_HREF).toBe(HOME_BRIDGES.guestHome);
    expect(PUBLIC_ROOT_HREF).toBe('/legacy/home?guest=1');
  });
});
