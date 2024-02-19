import { Player } from './playoffs';

export type Pick = {
  id: number;
  name: string;
  matchId: number;
  player: Player;
  correct: boolean | null;
};
