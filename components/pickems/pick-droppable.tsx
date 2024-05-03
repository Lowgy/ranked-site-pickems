/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { CheckCircle, Crown } from 'lucide-react';

export function PickDroppable(props: any) {
  const checkCorrect = () => {
    for (let i = 0; i < props.picks.length; i++) {
      if (props.picks[i].correct === true) {
        return true;
      } else if (props.picks[i].correct === false) {
        return false;
      }
    }
  };

  const checkIfCorrectIsSet = () => {
    for (let i = 0; i < props.picks.length; i++) {
      if (props.picks[i].correct !== null) {
        return true;
      }
    }
    return false;
  };

  const { setNodeRef } = useDroppable({
    id: `pick-droppable-match-${props.id}`,
    disabled: checkIfCorrectIsSet(),
  });

  return (
    <div
      className={`flex flex-col text-center items-center border-2 p-4 relative ${
        checkCorrect() === true
          ? 'bg-green-500 border-solid rounded border-green-600'
          : checkCorrect() === false
          ? 'bg-red-500 border-solid rounded border-red-600'
          : 'border-dashed border-gray-600 '
      }`}
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
    </div>
  );
}
