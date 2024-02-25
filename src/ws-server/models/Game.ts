import { Player } from './Player';
import { getUniqueNumber } from '../helpers';

export class Game {
  id: number;
  players: Player[];

  constructor(firstPlayer: Player) {
    this.id = getUniqueNumber();
    this.players = [firstPlayer];
  }
}
