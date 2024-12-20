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
    include: {
      picks: true,
    },
  });
  return NextResponse.json({ user, success: true });
}

export async function PUT(req: Request, { params }: { params: Email }) {
  const body = await req.json();
  const user = await prisma.user.update({
    where: {
      email: params.email,
    },
    data: {
      role: body.role,
    },
  });
  return NextResponse.json({ user, success: true });
}

export async function DELETE(req: Request, { params }: { params: Email }) {
  const user = await prisma.user.delete({
    where: {
      email: params.email,
    },
  });
  return NextResponse.json({ user, success: true });
}
