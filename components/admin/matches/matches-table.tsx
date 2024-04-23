'use client';
import * as React from 'react';
import { useState } from 'react';
import { Download, MoreHorizontal, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ApiMatches } from '@/components/admin/matches/api-matches';
import { ManualMatches } from '@/components/admin/matches/manual-matches';

export function MatchesTable() {
  const [showManual, setShowManual] = useState(false);
  const [showAPI, setShowAPI] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Matches</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Populate Matches</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Populate Matches</DialogTitle>
            </DialogHeader>
            {!showManual && !showAPI && (
              <div className="flex flex-row items-center text-center gap-x-8 h-[200px]">
                <Button
                  className="flex w-[45%] h-full border-dashed border-2 flex-col gap-y-2"
                  variant="outline"
                  onClick={() => setShowManual(true)}
                >
                  Manually Add
                  <Plus className="h-6 w-6" />
                </Button>
                <h1>Or</h1>
                <Button
                  className="flex w-[45%] h-full border-dashed border-2 flex-col gap-y-2"
                  variant="outline"
                  onClick={() => setShowAPI(true)}
                >
                  Pull from API
                  <Download className="h-6 w-6" />
                </Button>
              </div>
            )}
            {showAPI && <ApiMatches setShowAPI={setShowAPI} />}
            {showManual && <ManualMatches setShowManual={setShowManual} />}
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Participants</TableHead>
              <TableHead>Round</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Winner</TableHead>
              <TableHead className="hidden md:table-cell">Start Time</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Feinberg vs MoleyG</TableCell>
              <TableCell className="hidden md:table-cell">
                Round of 16
              </TableCell>
              <TableCell>
                <Badge variant="outline">Scheduled</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">Feinberg</TableCell>
              <TableCell className="hidden md:table-cell">
                2023-07-12 10:42 AM
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
