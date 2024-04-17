import { getServerSession } from 'next-auth';
import { authOptions } from './utils/auth';
import { BackgroundBeams } from '@/components/background-beams';
import dynamic from 'next/dynamic';

const OnBoardCard = dynamic(() => import('@/components/onboard-card'), {
  ssr: false,
});

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <div className="relative z-10">
        <OnBoardCard />
      </div>
      <BackgroundBeams />
    </main>
  );
}
