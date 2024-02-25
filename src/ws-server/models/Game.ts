import { Player } from './Player';
import { getSurroundShipCells, getUniqueNumber, sendMessage } from '../helpers';
import { ActionTypes, ShotStatuses } from '../constants';
import { Position, Ship } from '../types';

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

  private getNextPlayer(): Player {
    return this.players.find(
      (player) => player.id !== this.currentPlayer.id
    ) as Player;
  }

  private changePlayerTurn(): void {
    this.currentPlayer = this.getNextPlayer();
    this.processPlayerTurn();
  }

  private checkIsShotInvalid(attack: Position): boolean {
    return this.currentPlayer.attacks.some((shot) => {
      return shot.x === attack.x && shot.y === attack.y;
    });
  }

  attack(playerId: number, shot: Position): void {
    if (this.currentPlayer.id === playerId) {
      if (this.checkIsShotInvalid(shot)) {
        return this.processPlayerTurn();
      }

      this.currentPlayer.addAttack(shot);
      const enemyPlayer = this.getNextPlayer();

      const enemyShip = enemyPlayer.ships.find((ship) => {
        return ship.cells.some((cell) => {
          return cell.x === shot.x && cell.y === shot.y;
        });
      });

      if (enemyShip) {
        enemyShip.left -= 1;
      }

      let status: ShotStatuses;

      if (enemyShip && enemyShip.left === 0) {
        status = ShotStatuses.KILLED;

        enemyShip.cells.forEach((cell) => {
          this.sendAttackResult({ x: cell.x, y: cell.y }, status);
        });

        const surroundCells = getSurroundShipCells(enemyShip);

        surroundCells.forEach((cell) => {
          this.currentPlayer.addAttack(cell);
          this.sendAttackResult({ x: cell.x, y: cell.y }, ShotStatuses.OTHER);
        });

        this.currentPlayer.addDestroyedShipsCount();
      } else if (enemyShip) {
        status = ShotStatuses.SHOT;
      } else {
        status = ShotStatuses.MISS;
      }

      if (status !== ShotStatuses.KILLED) {
        this.sendAttackResult(shot, status);
      }

      if (status === ShotStatuses.MISS) {
        this.changePlayerTurn();
      } else {
        this.processPlayerTurn();
      }
    }
  }

  private sendAttackResult(shot: Position, status: ShotStatuses): void {
    this.players.forEach((player) => {
      player.socket &&
        sendMessage(
          player.socket,
          JSON.stringify({
            type: ActionTypes.ATTACK,
            data: JSON.stringify({
              position: shot,
              currentPlayer: this.currentPlayer.id,
              status,
            }),
            id: 0,
          })
        );
    });
  }
}
