import { RawData, WebSocketServer } from 'ws';
import { GameWebSocket } from './types';
import { getUniqueNumber } from './helpers';
import { handleClientMessages } from './controllers';
import { Database } from './models';
import { closeSocket } from './services';
import { WS_PORT } from './constants';

export const webSocketServer = new WebSocketServer({ port: WS_PORT });
export const database = new Database();

webSocketServer.on('connection', (socket: GameWebSocket) => {
  socket.index = getUniqueNumber();
  console.log(`Client ${socket.index} connected!`);

  socket.on('message', (message: RawData) => {
    handleClientMessages(message, socket, database);
  });

  socket.on('close', () => {
    closeSocket(socket, database.rooms);
  });
});

webSocketServer.on('close', () => {
  webSocketServer.clients.forEach((client) => {
    client.close();
  });
});
