import { getServerSession } from 'next-auth';
import { authOptions } from './utils/auth';
import Link from 'next/link';
import OnBoardModal from '@/components/onboard-modal';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <OnBoardModal />
    </main>
  );
}
