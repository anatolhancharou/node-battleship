import { getUniqueNumber } from '../../helpers';
import { Player } from '../Player';
import { getBotShips } from './bot-ships';

export class Bot extends Player {
  constructor() {
    const id = getUniqueNumber();
    super('Bot', '', id);
    this.setShips(getBotShips());
  }
}
