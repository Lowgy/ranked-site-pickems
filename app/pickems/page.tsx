'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Pickems() {
  const { data: session } = useSession({
    required: true,
    // onUnauthenticated: () => redirect('/'),
  });

  return <div>pickems</div>;
}
