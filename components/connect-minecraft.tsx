'use client';
import { Button } from './ui/button';
import { Swords } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

export default function ConnectMinecraft({
  disabled,
  token,
}: {
  disabled: boolean;
  token: string;
}) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleUpdateUser = async () => {
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ token, email: session?.user?.email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (data.success && data.redirectURL) {
      window.location.href = data.redirectURL;
    } else {
      toast({
        description: 'Failed to connect Minecraft account!',
        variant: 'destructive',
      });
    }
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
