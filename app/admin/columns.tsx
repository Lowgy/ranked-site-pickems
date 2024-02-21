/* eslint-disable @next/next/no-img-element */
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TableMatch } from '@/types/playoffs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

type DialogFormProps = {
  match: TableMatch;
};

const DialogForm = ({ match }: DialogFormProps) => {
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [matchData, setMatchData] = useState<TableMatch | null>(null);

  const handleCorrectPick = (playerId: number) => {
    setSelectedPlayer(playerId);
    match.winner = playerId;
    setMatchData(match);
  };

  const handleSaveClick = () => {
    //Save correct picks selections to local storage
    if (localStorage.getItem('correctPicks') === null) {
      localStorage.setItem('correctPicks', JSON.stringify([matchData]));
    } else {
      const correctPicks = JSON.parse(
        localStorage.getItem('correctPicks') || '[]'
      );
      //check if match already exists in correctPicks and update it
      const matchIndex = correctPicks.findIndex(
        (match: TableMatch) => match.id === matchData?.id
      );
      if (matchIndex !== -1) {
        correctPicks[matchIndex] = matchData;
      } else {
        correctPicks.push(matchData);
      }
      localStorage.setItem('correctPicks', JSON.stringify(correctPicks));
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">Open</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{match.name} Game</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center text-center">
            {' '}
            <div className="flex flex-row mb-4">
              {match.participants?.map((participant: any) => (
                <Button
                  key={participant.playerData?.uuid}
                  variant="ghost"
                  className={`flex items-center p-4 ${
                    selectedPlayer === participant.playerData?.uuid
                      ? 'bg-green-500'
                      : ''
                  }`}
                  onClick={() =>
                    handleCorrectPick(participant.playerData?.uuid)
                  }
                >
                  <img
                    src={`https://crafatar.com/avatars/${participant.playerData?.uuid}?overlay`}
                    alt={participant.playerData?.nickname}
                    height={32}
                    width={32}
                    className="mr-2 h-8 w-8 rounded-full"
                    loading="lazy"
                  />
                  {participant.playerData?.nickname}
                </Button>
              ))}
            </div>
            <DialogDescription>Who Won?</DialogDescription>
          </div>
          <Button
            variant={'default'}
            className="w-full"
            onClick={handleSaveClick}
            disabled={matchData === null}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const columns: ColumnDef<TableMatch>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="text-center">Name</div>,
  },
  {
    accessorKey: 'state',
    header: () => <div className="text-center">Match Status</div>,
    cell: ({ row }) => {
      const state = row.original.state;
      return (
        <div
          className={`flex items-center justify-center p-2 rounded-full ${
            state === 'DONE'
              ? 'bg-green-500 text-white'
              : state === 'SCHEDULED'
              ? 'bg-yellow-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {state !== null && state !== undefined
            ? state.charAt(0).toUpperCase() + state.slice(1).toLowerCase()
            : 'Not Scheduled'}
        </div>
      );
    },
  },
  {
    accessorKey: 'participants',
    header: () => <div className="text-center">Participants</div>,
    cell: ({ row }) => {
      const participants = row.original.participants;
      return (
        <div className="flex flex-row items-center justify-center">
          {participants?.map((participant) => (
            <div
              key={participant.playerData?.uuid}
              className="flex items-center p-4"
            >
              <img
                src={`https://crafatar.com/avatars/${participant.playerData?.uuid}?overlay`}
                alt={participant.playerData?.nickname}
                height={32}
                width={32}
                className="mr-2 h-8 w-8 rounded-full"
                loading="lazy"
              />
              {participant.playerData?.nickname}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const match = row.original;
      return <DialogForm match={match} />;
    },
  },
];
