import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

// export async function GET(req: Request) {
// }

export async function POST(req: Request) {
  const data = await req.json();
  const uuid = await fetch(
    `https://auth.aristois.net/token/${data.token}`
  ).then((res) => res.json().then((data) => data.uuid));

  const user = await prisma.user.update({
    where: {
      email: data.email,
    },
    data: {
      minecraftUUID: uuid,
    },
  });

  return NextResponse.json({ user, success: true, redirectURL: '/pickems' });
}
