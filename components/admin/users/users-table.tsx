'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/admin/users/data-table';
import { columns } from '@/components/admin/users/columns';
import { uuidToUsername } from '@/lib/utils';

export function UsersTable() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch('/api/user', {
      method: 'GET',
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage users and their roles.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={users} fetchUsers={fetchUsers} />
      </CardContent>
    </Card>
  );
}
