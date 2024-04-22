'use client';
import * as React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { CircleUserRound, LogOut, ShieldEllipsis } from 'lucide-react';

export function AvatarDropdown() {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={session?.user?.image} />
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              Profile <CircleUserRound className="w-4 h-4 ml-2" />
            </Link>
          </DropdownMenuItem>
          {session?.user?.role === 'admin' && (
            <DropdownMenuItem asChild>
              <Link href="/admin" className="cursor-pointer">
                Admin <ShieldEllipsis className="w-4 h-4 ml-2" />
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
            className="cursor-pointer"
          >
            Sign out <LogOut className="w-4 h-4 ml-2" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
