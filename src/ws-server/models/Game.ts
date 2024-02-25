import { Player } from './Player';
import { getUniqueNumber, sendMessage } from '../helpers';
import { ActionTypes } from '../constants';
import { Ship } from '../types';

export class Game {
  id: number;
  players: Player[];
  currentPlayer: Player;
  isSinglePlay: boolean;

  constructor(firstPlayer: Player, isSinglePlay: boolean) {
    this.id = getUniqueNumber();
    this.players = [firstPlayer];
    this.currentPlayer = firstPlayer;
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

  addShips(playerId: number, ships: Ship[]): void {
    const player = this.players.find((user) => user.id === playerId);
    player && !player.ships.length && player.setShips(ships);
    this.checkStartGame();
  }

  checkStartGame(): void {
    if (this.players.every((player) => player.ships.length)) {
      this.players.forEach((player) => {
        player.socket &&
          sendMessage(
            player.socket,
            JSON.stringify({
              type: ActionTypes.START_GAME,
              data: JSON.stringify({
                ships: player.originalShips,
                currentPlayerIndex: player.id,
              }),
              id: 0,
            })
          );
      });

      this.processPlayerTurn();
    }
  }

  private processPlayerTurn(): void {
    this.players.forEach((player) => {
      player.socket &&
        sendMessage(
          player.socket,
          JSON.stringify({
            type: ActionTypes.TURN,
            data: JSON.stringify({
              currentPlayer: this.currentPlayer.id,
            }),
            id: 0,
          })
        );
    });
  }
}
