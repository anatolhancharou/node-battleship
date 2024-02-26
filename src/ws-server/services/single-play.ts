import { Database, Game } from '../models';
import { updateRooms } from './shared';

export const handleSinglePlay = (
  playerId: number,
  database: Database
): void => {
  const { players, rooms } = database;
  const player = players.get(playerId);

  const currentPlayerRoom = Array.from(database.rooms.values()).find((room) =>
    room.players.some((user) => user.id === playerId)
  );

  if (player) {
    const newRoom = new Game(player, database, true);
    currentPlayerRoom && rooms.delete(currentPlayerRoom.id);
    rooms.set(newRoom.id, newRoom);
    updateRooms(rooms);
  }
};
