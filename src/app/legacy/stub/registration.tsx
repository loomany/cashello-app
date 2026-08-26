import { GuestStubScreen } from '@/features/legacyHome/GuestStubScreen';

export default function RegistrationStubRoute() {
  return (
    <GuestStubScreen
      route="/legacy/stub/registration"
      screenName="Guest registration stub"
      title="Завершите регистрацию"
      body="Экран шагов регистрации пока заглушка. Полный flow открывается с кнопки «Войти» на главной."
    />
  );
}
