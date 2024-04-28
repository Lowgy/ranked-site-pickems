/* eslint-disable @next/next/no-img-element */
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { uuidToUsername } from '@/lib/utils';

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  minecraftUUID: string;
  minecraftUsername: string;
  role: string;
  picks: any[];
  createdAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: () => <div>Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center text-center justify-start gap-x-4">
          <img
            src={row.original.image}
            alt={row.original.id}
            height={32}
            width={32}
            className="h-10 w-10 rounded-full"
            loading="lazy"
          />
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: 'minecraftUUID',
    header: 'Minecraft Account',
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center text-center gap-x-4">
          <img
            src={`https://crafatar.com/avatars/${row.original.minecraftUUID}`}
            alt={row.original.id}
            height={32}
            width={32}
            className="h-10 w-10 rounded-full"
            loading="lazy"
          />
          <p>{row.original.minecraftUsername}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return (
        <div className="hidden md:table-cell">
          <p>{row.original.role}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return (
        <div className="hidden md:table-cell">
          <p>{row.original.createdAt}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: (row) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
