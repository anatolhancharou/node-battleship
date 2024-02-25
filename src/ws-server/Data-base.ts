import { Game } from './Game';
import { Winner } from './types';
import { Player } from './Player';

export class DataBase {
  players: Map<number, Player>;
  rooms: Map<number, Game>;
  winners: Winner[];

  constructor() {
    this.players = new Map();
    this.rooms = new Map();
    this.winners = [];
  }
}
