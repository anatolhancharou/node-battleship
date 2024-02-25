import { WebSocket } from 'ws';
import { ActionTypes } from '../constants';

export interface GameWebSocket extends WebSocket {
  index: number;
}

export interface Winner {
  name: string;
  wins: number;
}

export interface IoMessage {
  type: ActionTypes;
  data: string;
  id: 0;
}

export interface LoginData {
  name: string;
  password: string;
}

export interface RoomUser {
  name: string;
  index: number;
}

export interface RoomData {
  roomId: number;
  roomUsers: RoomUser[];
}
