'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { PlayerDraggable } from '@/components/pickems/player-draggable';
import { PickDroppable } from '@/components/pickems/pick-droppable';
import { PickComponent } from '@/components/pickems/pick-component';

export default function Pickems() {
  const [matches, setMatches] = useState([]);
  const { data: session } = useSession({
    required: true,
  });

  const fetchMatches = async () => {
    const res = await fetch('/api/match');
    const data = await res.json();
    setMatches(data);
    console.log(data);
  };

  const handleDragEnd = (event: any) => {
    const playerPick = event.active.data.current;
    console.log(playerPick, event.over?.id);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-4 items-center">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {matches.map((match, index) => (
            <PickComponent match={match} key={index} />
          ))}
        </DndContext>
      </div>
    </>
  );
}
