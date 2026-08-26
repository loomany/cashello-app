import { Redirect } from 'expo-router';

import { PUBLIC_ROOT_HREF } from '@/app/publicRoot';

export default function Index() {
  return <Redirect href={PUBLIC_ROOT_HREF} />;
}
