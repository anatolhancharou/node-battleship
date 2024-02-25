import { Player } from './Player';
import { getUniqueNumber } from '../helpers';

export class Game {
  id: number;
  players: Player[];
  isSinglePlay: boolean;

  constructor(firstPlayer: Player, isSinglePlay: boolean) {
    this.id = getUniqueNumber();
    this.players = [firstPlayer];
    this.isSinglePlay = isSinglePlay;
  }
}
