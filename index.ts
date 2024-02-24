import { httpServer } from './src/http-server';

const HTTP_PORT = 8181;

console.log(`Start static http server is running on ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);
