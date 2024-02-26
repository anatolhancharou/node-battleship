import { Database, Game } from '../models';
import { updateRooms } from './shared';
import { CREATE_ROOM_ERROR } from '../constants';

export const handleRoomCreation = (
  playerId: number,
  database: Database
): void => {
  const { players, rooms } = database;
  const player = players.get(playerId);

  const isPlayerInRoom = Array.from(database.rooms.values()).some((room) =>
    room.players.some((user) => user.id === playerId)
  );

  if (player && !isPlayerInRoom) {
    const newRoom = new Game(player, database, false);
    rooms.set(newRoom.id, newRoom);
    updateRooms(rooms);
  } else if (isPlayerInRoom) {
    console.log(CREATE_ROOM_ERROR);
  }
};
