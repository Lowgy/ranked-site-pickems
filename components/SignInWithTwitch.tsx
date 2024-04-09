'use client';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

export default function SignInWithTwitch() {
  return (
    <Button
      onClick={() =>
        signIn('twitch', { callbackUrl: `${window.location.origin}` })
      }
    >
      Login
    </Button>
  );
}
