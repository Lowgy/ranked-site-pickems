import type { NextAuthOptions } from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';
import { TwitchProfile } from 'next-auth/providers/twitch';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { Adapter } from 'next-auth/adapters';
import prisma from './db';
import { randomUUID } from 'crypto';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 2,
  },
  providers: [
    TwitchProvider({
      profile(profile: TwitchProfile) {
        return {
          id: randomUUID(),
          name: profile.preferred_username,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? 'user',
        };
      },
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
} satisfies NextAuthOptions;
