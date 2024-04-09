import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from './utils/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? <h1>You are logged in</h1> : <h1>Please login</h1>}
    </main>
  );
}
