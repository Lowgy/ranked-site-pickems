'use client';

import { useSession } from 'next-auth/react';

export default function Pickems() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <div>
        <h1>Pickems</h1>
      </div>
    </main>
  );
}
