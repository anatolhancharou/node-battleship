import { RawData, WebSocketServer } from 'ws';
import { GameWebSocket } from './types';
import { getUniqueNumber } from './helpers';
import { handleClientMessages } from './controllers';
import { Database } from './models';

export const webSocketServer = new WebSocketServer({ port: 3000 });
export const database = new Database();

webSocketServer.on('connection', (socket: GameWebSocket) => {
  socket.index = getUniqueNumber();
  console.log(`Client ${socket.index} connected!`);

  socket.on('message', (message: RawData) => {
    handleClientMessages(message, socket, database);
  });
});

webSocketServer.on('close', () => {
  webSocketServer.clients.forEach((client) => {
    client.close();
  });
});
