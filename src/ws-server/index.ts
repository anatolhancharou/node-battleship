import { RawData, WebSocketServer } from 'ws';
import { GameWebSocket } from './types';
import { getUniqueNumber } from './helpers';

export const webSocketServer = new WebSocketServer({ port: 3000 });

webSocketServer.on('connection', (socket: GameWebSocket) => {
  socket.index = getUniqueNumber();
  console.log(`Client ${socket.index} connected!`);

  socket.on('message', (message: RawData) => {
    console.log(message.toString());
  });
});

webSocketServer.on('close', () => {
  webSocketServer.clients.forEach((client) => {
    client.close();
  });
});
