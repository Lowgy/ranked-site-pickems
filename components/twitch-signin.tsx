'use client';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { Twitch } from 'lucide-react';

export default function SignInWithTwitch() {
  return (
    <Button
      onClick={() =>
        signIn('twitch', { callbackUrl: `${window.location.origin}` })
      }
      className="bg-[#9046ff] text-white hover:bg-[#7b3dcf]"
    >
      Login <Twitch className="w-4 h-4 ml-4" />
    </Button>
  );
}
