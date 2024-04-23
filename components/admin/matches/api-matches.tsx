import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import populateMatches from '@/lib/actions/populateMatches';

type Props = {
  setShowAPI: Dispatch<SetStateAction<boolean>>;
};

export function ApiMatches({ setShowAPI }: Props) {
  const retrieveMatches = async () => {
    let matches = await populateMatches();
    console.log(matches);
  };

  return (
    <>
      <h1>API</h1>
      <Button onClick={() => retrieveMatches()}>Get Matches</Button>
      <Button onClick={() => setShowAPI(false)}>
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>
    </>
  );
}
