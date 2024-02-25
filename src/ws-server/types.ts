import { WebSocket } from 'ws';

export interface GameWebSocket extends WebSocket {
  index: number;
}

export interface Winner {
  name: string;
  wins: number;
}
