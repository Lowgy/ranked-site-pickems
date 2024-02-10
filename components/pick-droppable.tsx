/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Crown } from 'lucide-react';

export default function PickDroppable(props: any) {
  const { setNodeRef } = useDroppable({
    id: 'pick-droppable',
  });

  return (
    <div
      ref={setNodeRef}
      className="flex p-[1rem] w-[100%] min-h-[8rem] items-center flex-col"
    >
      {props.picks.length !== 0 ? (
        props.picks.map((pick: any, index: number) => (
          <div key={index}>
            <img
              src={`https://crafatar.com/avatars/${pick.uuid}?overlay`}
              alt={pick.uuid}
              height={32}
              width={32}
              className="mr-2 h-10 w-10"
              loading="lazy"
            />
            <h1 key={index}>{pick.nickname}</h1>
          </div>
        ))
      ) : (
        <>
          <Crown className="h-12 w-12" />
          <p>
            Drag and Drop <br />
            Pick here!
          </p>
        </>
      )}
    </div>
  );
}
