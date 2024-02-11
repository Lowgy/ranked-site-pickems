/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Crown } from 'lucide-react';

export default function PickDroppable(props: any) {
  const { setNodeRef } = useDroppable({
    id: `pick-droppable-match-${props.id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex p-[1rem] w-[100%] min-h-[8rem] items-center flex-col"
    >
      {props.picks.length !== 0 ? (
        props.picks.map((pick: any, index: number) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center w-32 h-32 justify-center"
            >
              <img
                src={`https://crafatar.com/avatars/${pick.player.uuid}?overlay`}
                alt={pick.player.uuid}
                height={32}
                width={32}
                className="mr-2 h-10 w-10"
                loading="lazy"
              />
              <h1 key={index}>{pick.player.nickname}</h1>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center text-center w-32 h-32 justify-center">
          <Crown size={32} />
          <p>
            Drag and Drop <br />
            to make your pick!
          </p>
        </div>
      )}
    </div>
  );
}

// <div
//   key={index}
//   className="flex flex-col items-center text-center w-32 h-32 justify-center"
// >
//   <img
//     src={`https://crafatar.com/avatars/${pick.player.uuid}?overlay`}
//     alt={pick.player.uuid}
//     height={32}
//     width={32}
//     className="mr-2 h-10 w-10"
//     loading="lazy"
//   />
//   <h1 key={index}>{pick.player.nickname}</h1>
// </div>
