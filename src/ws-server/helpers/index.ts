import WebSocket from 'ws';
import { GameWebSocket } from '../types';

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
