import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import populateMatches from '@/lib/actions/populateMatches';
import { useToast } from '@/components/ui/use-toast';

type Props = {
  setShowAPI: Dispatch<SetStateAction<boolean>>;
  resetDialog: () => void;
};

export function ApiMatches({ setShowAPI, resetDialog }: Props) {
  const { toast } = useToast();
  const retrieveMatches = async () => {
    let matches = await populateMatches();
    toast({
      title: 'Matches Retrieved!',
      description: `Matches have been retrieved successfully`,
    });
    resetDialog();
  };

  return (
    <>
      <Button onClick={() => retrieveMatches()}>Get Matches</Button>
      <Button onClick={() => setShowAPI(false)}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>
    </>
  );
}
