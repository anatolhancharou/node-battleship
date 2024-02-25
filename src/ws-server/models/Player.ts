import { GameWebSocket } from '../types';

export class Player {
  name: string;
  password: string;
  id: number;
  socket?: GameWebSocket;

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
}
