import { ActionTypes } from '../constants';
import { GameWebSocket, RoomData, Winner } from '../types';
import { Database, Game, Player } from '../models';
import { webSocketServer } from 'ws-server';
import { sendMessage } from '../helpers';

export const updateRoom = (rooms: Map<number, Game>): void => {
  const updateRoomResponseData = JSON.stringify({
    type: ActionTypes.UPDATE_ROOM,
    data: JSON.stringify(
      Array.from(rooms.values()).reduce((acc: RoomData[], curr: Game) => {
        if (curr.players.length === 1) {
          const player = curr.players[0] as Player;
          return [
            ...acc,
            {
              roomId: curr.id,
              roomUsers: [{ name: player.name, index: player.id }],
            },
          ];
        }
        return acc;
      }, [])
    ),
    id: 0,
  });

  webSocketServer.clients.forEach((socket) => {
    sendMessage(socket, updateRoomResponseData);
  });
};

export const updateWinners = (winners: Winner[], winnerName?: string): void => {
  if (winnerName) {
    const player = winners.find(({ name }) => winnerName === name);

    if (player) {
      player.wins += 1;
    } else {
      winners.push({ name: winnerName, wins: 1 });
    }

    winners.sort((a, b) => b.wins - a.wins);
  }

  webSocketServer.clients.forEach((socket) => {
    sendMessage(
      socket,
      JSON.stringify({
        type: ActionTypes.UPDATE_WINNERS,
        data: JSON.stringify(winners),
        id: 0,
      })
    );
  });
};

export const closeSocket = (
  socket: GameWebSocket,
  rooms: Database['rooms']
): void => {
  const currentRoom = Array.from(rooms.values()).find((room) => {
    return room.players.some((player) => player.id === socket.index);
  });

  if (currentRoom?.players.length === 2) {
    currentRoom.loseGame(socket.index);
  } else if (currentRoom) {
    rooms.delete(currentRoom.id);
    updateRoom(rooms);
  }

  console.log(`Client ${socket.index} disconnected!`);
};
