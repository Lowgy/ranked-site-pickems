'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from './ui/input';
import ConnectMinecraft from '@/components/connect-minecraft';
import SignInWithTwitch from '@/components/twitch-signin';

export default function OnBoardCard() {
  const { data: session } = useSession();
  const [authToken, setAuthToken] = useState<string>('');

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          Welcome to MCSRanked Pickems!
        </CardTitle>
        <CardDescription>
          This is a simple app to allow you to pick the winners of each ranked
          season playoffs! (Similar to the CS Major pickems).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center text-center gap-y-2">
          {session ? (
            <>
              <h2 className="text-sm">
                <Link
                  href="https://auth.aristois.net/auth"
                  className="text-green-500 hover:underline hover:text-green-600"
                  target="_blank"
                >
                  Click here
                </Link>{' '}
                to generate a Minecraft auth token!
              </h2>
              <Input
                placeholder="Paste Minecraft Auth Token"
                onChange={(e) => setAuthToken(e.target.value)}
                maxLength={6}
              />
            </>
          ) : (
            <h2>Please sign in with Twitch to get started!</h2>
          )}
          {session ? (
            <ConnectMinecraft
              disabled={authToken.length !== 6}
              token={authToken}
            />
          ) : (
            <SignInWithTwitch />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
