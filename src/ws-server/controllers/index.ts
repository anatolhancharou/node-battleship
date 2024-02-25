import { RawData } from 'ws';
import { GameWebSocket, IoMessage } from '../types';
import { ActionTypes } from '../constants';
import { logMessage } from '../helpers';
import { Database } from '../models/Database';
import { handleLogin } from './login';
import { handleRoomCreation } from './room-creation';

export const handleClientMessages = (
  message: RawData,
  ws: GameWebSocket,
  database: Database
): void => {
  const { type, data } = JSON.parse(message.toString()) as IoMessage;
  logMessage(`${message}`);

  switch (type) {
    case ActionTypes.REG: {
      handleLogin(ws, data, database);
      break;
    }

    case ActionTypes.CREATE_ROOM: {
      handleRoomCreation(ws, database, false);
      break;
    }

    case ActionTypes.SINGLE_PLAY: {
      handleRoomCreation(ws, database, true);
      break;
    }

    case ActionTypes.ADD_USER_TO_ROOM: {
      break;
    }

    case ActionTypes.ADD_SHIPS: {
      break;
    }

    case ActionTypes.ATTACK: {
      break;
    }

    case ActionTypes.RANDOM_ATTACK: {
      break;
    }
  }
};
