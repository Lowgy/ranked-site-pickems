import { PlayerDraggable } from '@/components/pickems/player-draggable';
import { PickDroppable } from '@/components/pickems/pick-droppable';

export function PickComponent({ match }: any) {
  return (
    <div
      key={match.matchID}
      className={`flex flex-row border-2 items-center justify-center space-x-8 p-12 rounded-lg bg-gray-400 w-full`}
    >
      <div className="flex flex-col space-y-4">
        {match.participants.map((participant, index) => {
          return (
            <div className="flex flex-col items-center text-center" key={index}>
              <PlayerDraggable key={participant.participant}>
                {participant.participant}
              </PlayerDraggable>
            </div>
          );
        })}
      </div>
      <PickDroppable id={match.matchID} />
    </div>
  );
}
