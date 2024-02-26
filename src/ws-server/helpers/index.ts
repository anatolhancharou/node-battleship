import WebSocket from 'ws';
import { GameWebSocket, Position, Ship } from '../types';
import { MAX_CELL_COORDINATE, MIN_CELL_COORDINATE } from '../constants';

const generatedNumbers = new Set<number>();

export const getUniqueNumber = (): number => {
  const currentNumber = Math.floor(Math.random() * Date.now());

  if (generatedNumbers.has(currentNumber)) {
    return getUniqueNumber();
  }

  generatedNumbers.add(currentNumber);
  return currentNumber;
};

export const logMessage = (msg: string, isResponse?: boolean): void => {
  console.log(`${isResponse ? 'Outgoing' : 'Incoming'} message: ${msg}`);
};

export const sendMessage = (
  ws: GameWebSocket | WebSocket,
  data: string
): void => {
  ws.send(data);
  logMessage(data, true);
};

const getIsCellWithinGameBoard = (cell: Position): boolean => {
  return [cell.x, cell.y].every(
    (value) => value >= MIN_CELL_COORDINATE && value <= MAX_CELL_COORDINATE
  );
};

export const getSurroundShipCells = (ship: Ship): Position[] => {
  const surroundCells: Position[] = [];

  if (ship.direction) {
    for (let x = ship.position.x - 1; x <= ship.position.x + 1; x += 1) {
      for (
        let y = ship.position.y - 1;
        y <= ship.position.y + ship.length;
        y += 1
      ) {
        if (
          !(
            x === ship.position.x &&
            y >= ship.position.y &&
            y < ship.position.y + ship.length
          ) &&
          getIsCellWithinGameBoard({ x, y })
        ) {
          surroundCells.push({ x, y });
        }
      }
    }
  } else {
    for (
      let x = ship.position.x - 1;
      x <= ship.position.x + ship.length;
      x += 1
    ) {
      for (let y = ship.position.y - 1; y <= ship.position.y + 1; y += 1) {
        if (
          !(
            y === ship.position.y &&
            x >= ship.position.x &&
            x < ship.position.x + ship.length
          ) &&
          getIsCellWithinGameBoard({ x, y })
        ) {
          surroundCells.push({ x, y });
        }
      }
    }
  }

  return surroundCells;
};

export const getRandomCoordinate = (): number => {
  return Math.floor(Math.random() * 10);
};
