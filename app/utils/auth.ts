import type { NextAuthOptions } from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { Adapter } from 'next-auth/adapters';
import prisma from './db';

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    signIn: ({ user, account, profile }) => {
      console.log('signIn', { user, account, profile });
      return true;
    },
  },
} satisfies NextAuthOptions;
