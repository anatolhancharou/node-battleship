import { ExtendedShip, GameWebSocket, Position, Ship } from '../types';

export class Player {
  name: string;
  password: string;
  id: number;
  socket?: GameWebSocket;
  originalShips: Ship[] = [];
  ships: ExtendedShip[] = [];

  constructor(
    name: string,
    password: string,
    id: number,
    socket: GameWebSocket
  ) {
    this.name = name;
    this.password = password;
    this.id = id;
    this.socket = socket;
  }

  setShips(ships: Ship[]): void {
    this.originalShips = ships;

    const extendedShips: ExtendedShip[] = ships.map((ship) => {
      const cells: Position[] = [];

      Array.from({ length: ship.length }).forEach((_, i) => {
        cells.push({
          x: ship.direction ? ship.position.x : ship.position.x + i,
          y: ship.direction ? ship.position.y + i : ship.position.y,
        });
      });

      return { ...ship, cells, left: ship.length };
    });

    this.ships = extendedShips;
  }
}
