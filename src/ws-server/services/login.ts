import WebSocket from 'ws';
import { Database, Player } from '../models';
import { GameWebSocket, LoginData } from '../types';
import { ActionTypes, INVALID_PASSWORD_ERROR } from '../constants';
import { updateRooms, updateWinners } from './shared';
import { sendMessage } from '../helpers';

export const handleLogin = (
  ws: GameWebSocket,
  data: string,
  database: Database
): void => {
  const { players, rooms, winners } = database;
  const { name, password } = JSON.parse(data) as LoginData;

  const currentUser = Array.from(players.values()).find(
    (player) => player.name === name
  );

  const isCredentialsValid = !currentUser || currentUser.password === password;

  isCredentialsValid &&
    players.set(ws.index, new Player(name, password, ws.index, ws));

  if (currentUser && isCredentialsValid) {
    currentUser.socket?.readyState === WebSocket.OPEN &&
      currentUser.socket?.close();
    players.delete(currentUser.id);
  }

  const loginData = isCredentialsValid
    ? {
        name,
        index: ws.index,
        error: false,
        errorText: '',
      }
    : {
        error: true,
        errorText: INVALID_PASSWORD_ERROR,
      };

  const responseData = JSON.stringify({
    type: ActionTypes.REG,
    data: JSON.stringify(loginData),
    id: 0,
  });

  sendMessage(ws, responseData);
  updateRooms(rooms);
  updateWinners(winners);
};
