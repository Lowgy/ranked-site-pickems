/* eslint-disable @next/next/no-img-element */
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Ellipsis } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MatchDialogs } from './matches-dialog';

export type Match = {
  participants: any[];
  name: string;
  season: string;
  state: string;
  winner: string;
  startTime: string;
};

export const columns: ColumnDef<Match>[] = [
  {
    accessorKey: 'season',
    header: 'Season',
    cell: ({ row }) => {
      return <div>{row.original.season}</div>;
    },
  },
  {
    accessorKey: 'participants',
    header: () => <div>Participants</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center text-center justify-start gap-x-4">
          <div
            key={row.original.participants[0].participant.id}
            className="text-center items-center"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <img
                    src={`https://crafatar.com/avatars/${row.original.participants[0].participant.uuid}?overlay`}
                    alt={row.original.participants[0].participant.id}
                    height={32}
                    width={32}
                    className="h-10 w-10 rounded-full"
                    loading="lazy"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {row.original.participants[0].participant.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          vs
          <div
            key={row.original.participants[1].participant.id}
            className="text-center items-center"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <img
                    src={`https://crafatar.com/avatars/${row.original.participants[1].participant.uuid}?overlay`}
                    alt={row.original.participants[1].participant.id}
                    height={32}
                    width={32}
                    className="h-10 w-10 rounded-full"
                    loading="lazy"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {row.original.participants[1].participant.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Round',
  },
  {
    accessorKey: 'state',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="hidden md:table-cell">
          <Badge
            variant="outline"
            className={
              row.original.state === 'DONE'
                ? 'done-match-badge'
                : row.original.state === 'SCHEDULED'
                ? 'scheduled-match-badge'
                : 'active-match-badge'
            }
          >
            {row.original.state}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'winner',
    header: 'Winner',
    cell: ({ row }) => {
      return (
        <div className="hidden md:table-cell">
          <p>{row.original.winner}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'startTime',
    header: 'Match Time',
    cell: ({ row }) => {
      return (
        <div className="hidden md:table-cell">
          <p>
            {' '}
            {new Date(parseInt(row.original.startTime) * 1000).toLocaleString(
              'en-US',
              {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }
            )}{' '}
            @{' '}
            {new Date(
              parseInt(row.original.startTime) * 1000
            ).toLocaleTimeString([], {
              timeZoneName: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: (row) => {
      return <MatchDialogs data={row} />;
    },
  },
];
