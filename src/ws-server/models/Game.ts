import { Player } from './Player';
import { getUniqueNumber, sendMessage } from '../helpers';
import { ActionTypes } from '../constants';

export class Game {
  id: number;
  players: Player[];
  isSinglePlay: boolean;

  constructor(firstPlayer: Player, isSinglePlay: boolean) {
    this.id = getUniqueNumber();
    this.players = [firstPlayer];
    this.isSinglePlay = isSinglePlay;
  }

  addPlayer(player: Player): void {
    if (this.players.length < 2) {
      this.players.push(player);
      this.checkCreateGame();
    }
  }

  checkCreateGame(): void {
    if (this.players.length === 2) {
      this.players.forEach((player) => {
        player.socket &&
          sendMessage(
            player.socket,
            JSON.stringify({
              type: ActionTypes.CREATE_GAME,
              data: JSON.stringify({
                idGame: this.id,
                idPlayer: player.id,
              }),
              id: 0,
            })
          );
      });
    }
  }
}
