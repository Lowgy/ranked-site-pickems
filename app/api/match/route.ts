import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

export async function GET() {
  const matches = await prisma.match.findMany({
    orderBy: {
      season: 'asc',
    },
  });

  return NextResponse.json(matches);
}

export async function POST(req: Request) {
  const data = await req.json();

  for (let i = 0; i < data.data.matches.length; i++) {
    const match = await prisma.match.findUnique({
      where: {
        matchID: `s${data.data.season}-${data.data.matches[i].id}`,
      },
    });
    if (match) {
      return NextResponse.json({
        status: 422,
        message: 'Match already exists',
        success: false,
      });
    }
    if (!match) {
      const match = await prisma.match.create({
        data: {
          matchID: `s${data.data.season}-${data.data.matches[i].id}`,
          name: data.data.matches[i].name,
          season: data.data.season,
          nextMatchId: data.data.matches[i].nextMatchId,
          startTime: data.data.matches[i].startTime || null,
          state: data.data.matches[i].state || null,
        },
      });
    }
  }

  return NextResponse.json({ success: true });
}
