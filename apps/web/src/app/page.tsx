import getMe from '@web/data/user/getMe';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getMe();
  if (user) {
    redirect('/posts');
  }
  return <main></main>;
}
