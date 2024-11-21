'use client';

import { use, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { PickComponent } from '@/components/pickems/pick-component';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export default function Pickems() {
  const [picksSaved, setPicksSaved] = useState(false);
  const [matches, setMatches] = useState([]);
  const [userPicks, setUserPicks] = useState<any>([]);
  const { data: session } = useSession({
    required: true,
  });

  const fetchMatches = async () => {
    const res = await fetch('/api/match', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setMatches(data);
  };

  // const fetchUserPicks = async () => {
  //   const res = await fetch(`/api/pick/logybear222@gmail.com`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await res.json();
  //   console.log('test');
  //   setUserPicks(data.picks);
  // };

  const handleDragEnd = (event: any) => {
    const playerPick = event.active.data.current;
    const matchID = event.over?.id?.split('-').slice(-2).join('-');
    const chosenPick = {
      matchID: matchID,
      winner: playerPick.name,
      uuid: playerPick.uuid,
      user: session?.user?.email,
    };
    //Check if the user has already picked for this match
    const pickIndex = userPicks.findIndex(
      (pick: any) => pick.matchID === matchID
    );
    if (pickIndex !== -1) {
      const newPicks = [...userPicks];
      newPicks[pickIndex] = chosenPick;
      setUserPicks(newPicks);
    } else {
      setUserPicks([...userPicks, chosenPick]);
    }
  };

  const handleSaveClick = async () => {
    const res = await fetch('/api/pick', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userPicks),
    });
    if (res.ok) {
      setPicksSaved(true);
    }
  };

  useEffect(() => {
    fetchMatches();
    // fetchUserPicks();
  }, []);

  useEffect(() => {
    console.log(userPicks);
  }, [userPicks]);

  return (
    <>
      {matches.length !== 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-4 items-center">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              {matches.map((match, index) => (
                <PickComponent match={match} key={index} picks={userPicks} />
              ))}
            </DndContext>
          </div>
          <div className="flex flex-col md:flex-row items-center pb-4">
            <Button
              className={`mt-4 ${
                picksSaved
                  ? 'bg-green-500 disabled:cursor-default disabled:bg-green-500 disabled:opacity-100'
                  : 'bg-blue-500'
              }`}
              onClick={handleSaveClick}
            >
              {picksSaved ? 'Picks Saved!' : 'Save Picks'}
            </Button>
          </div>
        </>
      ) : (
        <h1>No Matches available currently!</h1>
      )}
    </>
  );
}
