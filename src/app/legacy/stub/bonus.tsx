import { GuestStubScreen } from '@/features/legacyHome/GuestStubScreen';

export default function BonusStubRoute() {
  return (
    <GuestStubScreen
      route="/legacy/stub/bonus"
      screenName="Guest bonus stub"
      title="Бонусный счет"
      body="Экран бонусного счета пока заглушка. Баланс 500 Б на главной — демо-превью."
    />
  );
}
