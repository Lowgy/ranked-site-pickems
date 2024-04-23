'use client';

import { RecentPicksTable } from '@/components/admin/recent-picks-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CircleCheckBig, CircleX, MousePointerClick } from 'lucide-react';
import { UsersTable } from '@/components/admin/users-table';
import { MatchesTable } from '@/components/admin/matches/matches-table';

export default function Admin() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Admin Console</h2>
          </div>
          <Tabs defaultValue="picks" className="space-y-4">
            <TabsList>
              <TabsTrigger value="picks">Picks</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="picks" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-medium text-sm">
                      Total Picks
                    </CardTitle>
                    <MousePointerClick size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-medium text-sm">
                      Total Correct Picks
                    </CardTitle>
                    <CircleCheckBig size={20} className="text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="font-medium text-sm">
                      Total Incorrect Picks
                    </CardTitle>
                    <CircleX size={20} className="text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4</div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <RecentPicksTable />
              </div>
            </TabsContent>
            <TabsContent value="matches" className="space-y-4">
              <MatchesTable />
            </TabsContent>
            <TabsContent value="users" className="space-y-4">
              <UsersTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
