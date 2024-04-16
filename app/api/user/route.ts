import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import prisma from '@/app/utils/db';

export async function GET(req: NextApiRequest) {
  const session = await getSession({ req });
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined,
    },
  });
  return user;
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data.token);
  const uuid = await fetch(
    `https://auth.aristois.net/token/${data.token}`
  ).then((res) => res.json().then((data) => data.uuid));

  const user = await prisma.user.update({
    where: {
      email: 'logybear222@gmail.com',
    },
    data: {
      minecraftUUID: uuid,
    },
  });

  return NextResponse.json({ user, success: true });
}
