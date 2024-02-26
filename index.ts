import { HTTP_PORT, WS_PORT } from './src/ws-server/constants';
import { httpServer } from './src/http-server';
import './src/ws-server';

console.log(`Start static http server is running on ${HTTP_PORT} port!`);
console.log(`Web socket server is running on ${WS_PORT} port!`);

httpServer.listen(HTTP_PORT);
