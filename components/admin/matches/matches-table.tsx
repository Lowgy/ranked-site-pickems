'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ApiMatches } from '@/components/admin/matches/api-matches';
import { ManualMatches } from '@/components/admin/matches/manual-matches';
import { DataTable } from '@/components/admin/matches/data-table';
import { columns } from '@/components/admin/matches/columns';

export function MatchesTable() {
  const [showManual, setShowManual] = useState(false);
  const [showAPI, setShowAPI] = useState(false);
  const [open, setOpen] = useState(false);
  const [matches, setMatches] = useState([]);

  const resetDialog = () => {
    setOpen(!open);
    setShowManual(false);
    setShowAPI(false);
    fetchMatches();
  };

  const fetchMatches = async () => {
    const response = await fetch('/api/match', {
      method: 'GET',
    });
    const data = await response.json();
    console.log(data);
    setMatches(data);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Matches</CardTitle>
        <Dialog open={open} onOpenChange={() => resetDialog()}>
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
                  disabled={true}
                >
                  Add Manually
                  <p className="text-xs">(Coming Soon)</p>
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
            {showAPI && (
              <ApiMatches setShowAPI={setShowAPI} resetDialog={resetDialog} />
            )}
            {showManual && <ManualMatches setShowManual={setShowManual} />}
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={matches}
          fetchMatches={fetchMatches}
        />
      </CardContent>
    </Card>
  );
}
