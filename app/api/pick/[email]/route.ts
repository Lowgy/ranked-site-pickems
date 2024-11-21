import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

interface Email {
  email: string;
}

export async function GET(req: Request, { params }: { params: Email }) {
  const picks = await prisma.pick.findMany({
    where: {
      userEmail: params.email,
    },
  });
  return NextResponse.json({ picks, success: true });
}
