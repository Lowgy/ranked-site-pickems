import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

export async function GET() {
  const matches = await prisma.match.findMany({
    orderBy: {
      season: 'asc',
    },
    include: {
      participants: {
        include: {
          participant: true,
        },
      },
    },
  });

  return NextResponse.json(matches);
}

export async function POST(req: Request) {
  const data = await req.json();

  const players = data.data.players;

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
      const participant1 = await prisma.participant.upsert({
        where: {
          name: players[data.data.matches[i].participants[0].player].nickname,
        },
        update: {
          name: players[data.data.matches[i].participants[0].player].nickname,
        },
        create: {
          name: players[data.data.matches[i].participants[0].player].nickname,
          uuid: players[data.data.matches[i].participants[0].player].uuid,
          seedNumber:
            players[data.data.matches[i].participants[0].player].seedNumber + 1,
        },
      });

      const participant2 = await prisma.participant.upsert({
        where: {
          name: players[data.data.matches[i].participants[1].player].nickname,
        },
        update: {
          name: players[data.data.matches[i].participants[1].player].nickname,
        },
        create: {
          name: players[data.data.matches[i].participants[1].player].nickname,
          uuid: players[data.data.matches[i].participants[1].player].uuid,
          seedNumber:
            players[data.data.matches[i].participants[1].player].seedNumber + 1,
        },
      });

      const match = await prisma.match.create({
        data: {
          matchID: `s${data.data.season}-${data.data.matches[i].id}`,
          name: data.data.matches[i].name,
          season: data.data.season,
          nextMatchId: data.data.matches[i].nextMatchId,
          startTime: data.data.matches[i].startTime || null,
          state: data.data.matches[i].state || null,
          winner:
            data.data.matches[i].participants[0].roundScore >
            data.data.matches[i].participants[1].roundScore
              ? players[data.data.matches[i].participants[0].player].nickname
              : players[data.data.matches[i].participants[1].player].nickname ||
                null,
          participants: {
            create: [
              { participantId: participant1.id },
              { participantId: participant2.id },
            ],
          },
        },
      });
    }
  }

  return NextResponse.json({ success: true });
}
