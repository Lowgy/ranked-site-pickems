'use client';

import { DataTable } from './data-table';
import { columns } from './columns';
import { playoffs } from '../data/playoffs';
import { Player, Participant, TableMatch, Matches } from '../../types/playoffs';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function Admin() {
  let playoff = playoffs[0].data.data;
  const [matches, setMatches] = useState<TableMatch[] | Matches[]>([]);
  const { toast } = useToast();

  const initialData = () => {
    // if (localStorage.getItem('matches') !== null) {
    //   playoff = JSON.parse(localStorage.getItem('matches') || '{}');
    // }
    let players: Player[] = [];
    let matches: TableMatch[] = [];

    console.log(playoff);

    for (let i = 0; i < playoff.players.length; i++) {
      players.push(playoff.players[i]);
    }

    for (let i = 0; i < playoff.matches.length; i++) {
      if (
        playoff.matches[i].participants[0] &&
        playoff.matches[i].participants[1]
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
        let match: TableMatch = {
          id: playoff.matches[i].id,
          name: playoff.matches[i].name,
          state: playoff.matches[i].state,
          participants: playoff.matches[i].participants,
          nextMatchId: playoff.matches[i].nextMatchId,
          winner: null,
        };
        matches.push(match);
      }
    }
    return matches;
  };

  const handleResetData = () => {
    toast({
      title: 'Picks data has been reset!',
      variant: 'default',
    });
    localStorage.removeItem('picks');
    localStorage.removeItem('correctPicks');
    localStorage.removeItem('matches');
  };

  useEffect(() => {
    if (localStorage.getItem('matches') !== null) {
      setMatches(JSON.parse(localStorage.getItem('matches') || '[]'));
    } else {
      setMatches(initialData());
    }
  }, []);

  return (
    <main className="h-full flex-col p-12 md:flex justify-center md:mx-64">
      <div className="flex justify-end mb-4">
        <Button variant={'destructive'} onClick={handleResetData}>
          Reset Picks Data
        </Button>
      </div>
      <DataTable columns={columns} data={matches} />
    </main>
  );
}
