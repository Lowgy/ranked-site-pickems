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
    signIn: async ({ user, account, profile }) => {
      return true;
    },
    async session({ session, token, user }) {
      return Promise.resolve(session);
    },
    jwt: async (token: any) => {
      return Promise.resolve(token);
    },
  },
} satisfies NextAuthOptions;
