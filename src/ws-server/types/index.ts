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

export interface Position {
  x: number;
  y: number;
}

export interface Ship {
  position: Position;
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface ShipsRequestData {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
}

export interface ExtendedShip extends Ship {
  cells: Position[];
  left: number;
}

export interface AttackData {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
}
