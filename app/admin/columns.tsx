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
import { useState } from 'react';

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
      const matchName = row.original.name;
      const participants: any = [];
      row.original.participants?.map((participant) => {
        participants.push(participant);
      });
      return (
        <div className="flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">Open</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{matchName} Game</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center text-center">
                {' '}
                <div className="flex flex-row">
                  {participants?.map((participant: any) => (
                    <Button
                      key={participant.playerData?.uuid}
                      variant="ghost"
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
                    </Button>
                  ))}
                </div>
                <DialogDescription>Who Won?</DialogDescription>
              </div>
              <Button variant={'default'} className="w-full">
                Save
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
