import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

export async function POST(req: Request) {
  const data = await req.json();
  for (let i = 0; i < data.length; i++) {
    const pick = await prisma.pick.upsert({
      where: {
        matchId: data[i].matchID,
      },
      update: {
        winner: data[i].winner,
        uuid: data[i].uuid,
      },
      create: {
        winner: data[i].winner,
        uuid: data[i].uuid,
        user: {
          connect: {
            email: data[i].user,
          },
        },
        matchDetails: {
          connect: {
            matchID: data[i].matchID,
          },
        },
      },
      include: {
        matchDetails: true,
      },
    });
  }
  return NextResponse.json({ success: true });
}
