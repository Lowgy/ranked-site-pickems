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
import { Button } from './ui/button';
import { Lock } from 'lucide-react';

export default function DragDrop() {
  const [playoff, setPlayoff] = useState(playoffs[0].data.data);
  const [tabHeaders, setTabHeaders] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [picks, setPicks] = useState<Pick[]>([]);
  const [picksSaved, setPicksSaved] = useState(false);

  //TODO: Add loader for initial data load
  //TODO: Check if picks are correct or incorrect on load from correctPicks in localStorage
  //TODO: Fix admin dialog for choosing correct picks
  const initalData = () => {
    const savedPicks = localStorage.getItem('picks');

    if (localStorage.getItem('correctPicks') !== null && savedPicks) {
      const correctPicks = JSON.parse(
        localStorage.getItem('correctPicks') as string
      );
      const tempPicks = [...JSON.parse(savedPicks)];
      for (let i = 0; i < correctPicks.length; i++) {
        for (let j = 0; j < tempPicks.length; j++) {
          if (correctPicks[i].id === tempPicks[j].id) {
            if (correctPicks[i].winner === tempPicks[j].player.uuid) {
              tempPicks[j].correct = true;
            } else {
              tempPicks[j].correct = false;
            }
          }
        }
      }
      setPicks(tempPicks);
    } else if (savedPicks) {
      setPicks(JSON.parse(savedPicks));
      setPicksSaved(true);
    }

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
    const playerPick = event.active.data.current;
    let ids: number[] = [];
    for (let i = 0; i < playoff.matches.length; i++) {
      ids.push(playoff.matches[i].id);
    }
    for (let i = 0; i < playoff.matches.length; i++) {
      if (event.over?.id === `pick-droppable-match-${i + 1}`) {
        if (ids.includes(i + 1)) {
          const newPick: Pick = {
            id: i + 1,
            name: `Match #${i + 1}`,
            matchId: i + 1,
            player: playerPick,
            correct: null,
          };
          const pickIndex = picks.findIndex(
            (pick) => pick.matchId === newPick.matchId
          );
          if (pickIndex !== -1) {
            const temp = [...picks];
            temp[pickIndex] = newPick;
            setPicks(temp);
          } else {
            setPicks((prev) => [...prev, newPick]);
          }
        }
      }
    }
  };

  const handleSaveClick = () => {
    setPicksSaved(true);
    localStorage.setItem('picks', JSON.stringify(picks));
  };

  const checkRoundMatches = (header: string) => {
    let matches = playoff.matches.filter((match) => match.name === header);
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].participants.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('picks') !== JSON.stringify(picks)) {
      setPicksSaved(false);
    }
  }, [picks]);

  useEffect(() => {
    initalData();
  }, []);

  return (
    <Tabs defaultValue="Round of 16">
      <TabsList>
        {tabHeaders.map((header, index) => {
          return (
            <TabsTrigger
              key={index}
              value={header}
              disabled={checkRoundMatches(header)}
            >
              {header}{' '}
              {checkRoundMatches(header) && <Lock className="ml-2 h-4 w-4" />}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabHeaders.map((header, index) => {
        return (
          <TabsContent key={index} value={header}>
            <div className="flex flex-col w-full text-center select-none bg-gray-600 rounded-lg p-10">
              <div className="flex flex-col md:flex-row items-center justify-between pb-4">
                <h1 className="text-xl">
                  Get 4 correct picks for the {header}!
                </h1>
                <Button
                  className={`mt-4 ${
                    picksSaved
                      ? 'bg-green-500 disabled:cursor-default disabled:bg-green-500 disabled:opacity-100'
                      : 'bg-blue-500'
                  }`}
                  onClick={handleSaveClick}
                  disabled={!picks.length || picksSaved}
                >
                  {picksSaved ? 'Picks Saved!' : 'Save Picks'}
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-4 items-center">
                {playoff.matches
                  .filter((match) => match.name === header)
                  .map((match, index) => {
                    return (
                      <>
                        <DndContext
                          onDragEnd={handleDragEnd}
                          collisionDetection={closestCenter}
                          key={index}
                        >
                          <div
                            key={index}
                            className={`flex flex-col p-12 border-2 items-center space-y-5 rounded-lg bg-gray-400 w-full ${
                              picksSaved && picks?.[index].correct === null
                                ? 'border-green-500 border-4'
                                : picks?.[index].correct === true
                                ? 'border-green-500 border-4'
                                : picks?.[index].correct === false
                                ? 'border-red-500 border-4'
                                : ''
                            }`}
                          >
                            <h1 className="text-xl">Match #{index + 1}</h1>
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

                            <PickDroppable
                              key={index}
                              id={match.id}
                              picks={picks.filter(
                                (pick) => pick.matchId === match.id
                              )}
                            />
                          </div>
                        </DndContext>
                      </>
                    );
                  })}
              </div>
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
