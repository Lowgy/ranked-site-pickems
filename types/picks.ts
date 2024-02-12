import { Player } from './playoffs';

export type Pick = {
  id: number;
  matchId: number;
  player: Player;
  correct: boolean | null;
};
