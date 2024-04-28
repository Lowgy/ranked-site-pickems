import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

// export async function GET(req: Request) {
// }

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const data = await req.json();
  const uuid = await fetch(
    `https://auth.aristois.net/token/${data.token}`
  ).then((res) => res.json().then((data) => data.uuid));

  const mcUserName = await fetch('https://api.minetools.eu/uuid/' + uuid)
    .then((res) => res.json())
    .then((data) => data.name);

  const user = await prisma.user.update({
    where: {
      email: data.email,
    },
    data: {
      minecraftUUID: uuid,
      minecraftUsername: mcUserName,
    },
  });

  return NextResponse.json({ user, success: true, redirectURL: '/pickems' });
}
