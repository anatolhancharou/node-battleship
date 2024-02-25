import { ADD_USER_ERROR } from 'ws-server/constants';
import { Database } from '../models';
import { updateRoom } from '../services';
import { GameWebSocket } from '../types';

export const handleUserAddition = (
  ws: GameWebSocket,
  data: string,
  database: Database
): void => {
  const { players, rooms } = database;
  const { indexRoom } = JSON.parse(data) as { indexRoom: number };

  const room = rooms.get(indexRoom);
  const player = players.get(ws.index);

  if (room && player && room.players[0]?.id !== player.id) {
    room.addPlayer(player);
    updateRoom(rooms);
  } else {
    console.log(ADD_USER_ERROR);
  }
};
