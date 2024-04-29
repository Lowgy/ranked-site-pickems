import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';

interface MatchID {
  matchID: string;
}

export async function DELETE(req: Request, { params }: { params: MatchID }) {
  const match = await prisma.match.delete({
    where: {
      matchID: params.matchID,
    },
  });
  return NextResponse.json({ match, success: true });
}
