'use client';

/* eslint-disable @next/next/no-img-element */
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { playoffs } from '../app/data/playoffs';
import { Participant, Player } from '../types/playoffs';
import { Pick } from '../types/picks';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlayerDraggable from './player-draggable';
import PickDroppable from './pick-droppable';

export default function DragDrop() {
  const [playoff, setPlayoff] = useState(playoffs[0].data.data);
  const [tabHeaders, setTabHeaders] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [parent, setParent] = useState<HTMLDivElement | null>(null);
  const [picks, setPicks] = useState<Pick[]>([]);

  const initalData = () => {
    let headers: string[] = [];
    let players: Player[] = [];

    for (let i = 0; i < playoff.players.length; i++) {
      players.push(playoff.players[i]);
    }

    for (let i = 0; i < playoff.matches.length; i++) {
      if (
        playoff.matches[i].participants[0]?.player !== null &&
        playoff.matches[i].participants[1]?.player !== null
      ) {
        for (let j = 0; j < players.length; j++) {
          if (
            players[j].seedNumber === playoff.matches[i].participants[0]?.player
          ) {
            (playoff.matches[i].participants[0] as Participant).playerData =
              players[j];
          }
          if (
            players[j].seedNumber === playoff.matches[i].participants[1]?.player
          ) {
            (playoff.matches[i].participants[1] as Participant).playerData =
              players[j];
          }
        }
      }
      headers.push(playoff.matches[i].name);
    }

    let sortHeaders = headers.filter((item, index) => {
      return headers.indexOf(item) === index;
    });

    setTabHeaders(sortHeaders.reverse());
    setPlayers(players);
  };

  const handleDragEnd = (event: any) => {
    const newPick = event.active.data.current;
    if (event.over?.id !== 'pick-droppable' || !newPick) return;
    const temp = [...picks];
    temp.push(newPick);
    setPicks(temp);
  };

  useEffect(() => {
    initalData();
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <Tabs defaultValue="Round of 16">
        <TabsList>
          {tabHeaders.map((header, index) => {
            return (
              <TabsTrigger key={index} value={header}>
                {header}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {tabHeaders.map((header, index) => {
          return (
            <TabsContent key={index} value={header}>
              <div className="flex flex-col w-full text-center bg-gray-600 rounded-lg p-12">
                <h1 className="pb-4 text-xl">
                  Get 4 correct picks for the {header}!
                </h1>
                <div className="grid grid-cols-4 gap-x-4 gap-y-4">
                  {playoff.matches
                    .filter((match) => match.name === header)
                    .map((match, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col p-12 border-2 items-center space-y-5 rounded-lg bg-gray-400"
                        >
                          <div className="flex flex-row space-x-8">
                            {match.participants.map((participant, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex flex-col items-center text-center"
                                >
                                  <PlayerDraggable key={participant.player}>
                                    {players[participant.player]}
                                  </PlayerDraggable>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex flex-col text-center items-center border-dashed border-2 border-gray-600 p-4">
                            <PickDroppable
                              key={index}
                              id={index}
                              picks={picks}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </DndContext>
  );
}
