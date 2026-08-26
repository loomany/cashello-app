import { Redirect } from 'expo-router';

/** Legacy stub path → real Payment screen. */
export default function PaymentStubRedirect() {
  return <Redirect href="/legacy/payment" />;
}
