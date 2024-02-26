import { ADD_USER_ERROR } from '../constants';
import { Database } from '../models';
import { updateRooms } from './shared';

export const handleUserAddition = (
  playerId: number,
  data: string,
  database: Database
): void => {
  const { players, rooms } = database;
  const { indexRoom } = JSON.parse(data) as { indexRoom: number };

  const room = rooms.get(indexRoom);
  const currentPlayer = players.get(playerId);

  const existingRoomWithCurrentPlayer = Array.from(rooms.values()).find(
    (room) => room.players.some((player) => player.id === currentPlayer?.id)
  );

  if (room && currentPlayer) {
    if (room.players[0]?.id !== currentPlayer.id) {
      room.addPlayer(currentPlayer);
      existingRoomWithCurrentPlayer &&
        rooms.delete(existingRoomWithCurrentPlayer.id);
      updateRooms(rooms);
    } else {
      console.log(ADD_USER_ERROR);
    }
  }
};
