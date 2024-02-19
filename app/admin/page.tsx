'use client';

import { DataTable } from './data-table';
import { columns } from './columns';
import { playoffs } from '../data/playoffs';
import { Player, Participant, TableMatch } from '../../types/playoffs';
import { useEffect, useState } from 'react';

export default function Admin() {
  const playoff = playoffs[0].data.data;
  const [matches, setMatches] = useState<TableMatch[]>([]);

  const initialData = () => {
    let players: Player[] = [];
    let matches: TableMatch[] = [];

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
          winner: null,
        };
        matches.push(match);
      }
    }
    return matches;
  };

  useEffect(() => {
    setMatches(initialData());
  }, []);

  return (
    <main className="h-full flex-col p-12 md:flex justify-center md:mx-64">
      <DataTable columns={columns} data={matches} />
    </main>
  );
}
