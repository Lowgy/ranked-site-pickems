import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type Props = {
  setShowManual: Dispatch<SetStateAction<boolean>>;
};

export function ManualMatches({ setShowManual }: Props) {
  return (
    <>
      <h1>Manual</h1>
      <Button onClick={() => setShowManual(false)}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>
    </>
  );
}
