import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

interface Email {
  email: string;
}

export async function GET(req: Request, { params }: { params: Email }) {
  const user = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  });
  return NextResponse.json({ user, success: true });
}
