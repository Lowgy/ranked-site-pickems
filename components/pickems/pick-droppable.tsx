/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { CheckCircle, Crown } from 'lucide-react';

export function PickDroppable(props: any) {
  const { setNodeRef } = useDroppable({
    id: `pick-droppable-match-${props.id}`,
  });

  return (
    <div
      className={`flex flex-col text-center items-center border-2 p-4 relative`}
    >
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
                {pick.correct ? (
                  <div className="absolute top-0 right-0 p-2">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                ) : (
                  ''
                )}
                <img
                  src={`https://crafatar.com/avatars/${pick.uuid}?overlay`}
                  alt={pick.winner}
                  height={32}
                  width={32}
                  className="mr-2 h-10 w-10"
                  loading="lazy"
                />
                <h1 key={index}>{pick.winner}</h1>
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
    </div>
  );
}
