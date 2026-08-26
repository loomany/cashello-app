import { GuestStubScreen } from '@/features/legacyHome/GuestStubScreen';

export default function CashhelloUserStubRoute() {
  return (
    <GuestStubScreen
      route="/legacy/stub/cashhello-user"
      screenName="Cashhello user transfer stub"
      title="Пользователю Cashhello"
      body="Перевод другому пользователю Cashhello — локальная заглушка. Экран выбора получателя ещё не сверстан."
    />
  );
}
