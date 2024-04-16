'use client';
import { Button } from './ui/button';
import { Swords } from 'lucide-react';

export default function ConnectMinecraft({
  disabled,
  token,
}: {
  disabled: boolean;
  token: string;
}) {
  console.log(token);
  const handleUpdateUser = async () => {
    // Update user
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <Button
      disabled={disabled}
      className="text-white bg-green-500 hover:bg-green-600"
      onClick={handleUpdateUser}
    >
      <Swords size={24} />
      <span className="ml-2">Connect Minecraft</span>
    </Button>
  );
}
