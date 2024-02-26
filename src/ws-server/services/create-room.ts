import { Database, Game } from '../models';
import { updateRooms } from './shared';
import { GameWebSocket } from '../types';
import { CREATE_ROOM_ERROR } from '../constants';

export const handleRoomCreation = (
  ws: GameWebSocket,
  database: Database,
  isSinglePlay: boolean
): void => {
  const { players, rooms } = database;
  const player = players.get(ws.index);

  const isPlayerInRoom = Array.from(database.rooms.values()).some((room) =>
    room.players.some((user) => user.id === player?.id)
  );

  if (player && !isPlayerInRoom) {
    const newRoom = new Game(player, database, isSinglePlay);
    rooms.set(newRoom.id, newRoom);
    updateRooms(rooms);
  } else if (isPlayerInRoom) {
    console.log(CREATE_ROOM_ERROR);
  }
};
