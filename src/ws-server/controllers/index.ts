import { RawData } from 'ws';
import {
  AttackData,
  GameWebSocket,
  IoMessage,
  RandomAttackData,
  ShipsRequestData,
} from '../types';
import { ActionTypes } from '../constants';
import { logMessage } from '../helpers';
import { Database } from '../models';
import {
  handleLogin,
  handleRoomCreation,
  handleSinglePlay,
  handleUserAddition,
} from '../services';

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
      handleRoomCreation(ws.index, database);
      break;
    }

    case ActionTypes.SINGLE_PLAY: {
      handleSinglePlay(ws.index, database);
      break;
    }

    case ActionTypes.ADD_USER_TO_ROOM: {
      handleUserAddition(ws.index, data, database);
      break;
    }

    case ActionTypes.ADD_SHIPS: {
      const { gameId, ships, indexPlayer } = JSON.parse(
        data
      ) as ShipsRequestData;
      const currentGame = database.rooms.get(gameId);
      currentGame?.addShips(indexPlayer, ships);
      break;
    }

    case ActionTypes.ATTACK: {
      const { gameId, indexPlayer, x, y } = JSON.parse(data) as AttackData;
      const currentGame = database.rooms.get(gameId);
      currentGame?.attack(indexPlayer, { x, y });
      break;
    }

    case ActionTypes.RANDOM_ATTACK: {
      const { indexPlayer, gameId } = JSON.parse(data) as RandomAttackData;
      const currentGame = database.rooms.get(gameId);
      currentGame?.randomAttack(indexPlayer);
      break;
    }
  }
};
