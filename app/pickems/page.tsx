'use client';

import { useSession } from 'next-auth/react';
import { DndContext } from '@dnd-kit/core';
import { PlayerDraggable } from '@/components/pickems/player-draggable';
import { PickDroppable } from '@/components/pickems/pick-droppable';

export default function Pickems() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <>
      <div className="hidden flex-col md:flex"></div>
    </>
  );
}
