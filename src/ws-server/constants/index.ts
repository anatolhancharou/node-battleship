export const HTTP_PORT = 8181;
export const WS_PORT = 3000;

export enum ActionTypes {
  REG = 'reg',
  CREATE_ROOM = 'create_room',
  UPDATE_WINNERS = 'update_winners',
  UPDATE_ROOM = 'update_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  CREATE_GAME = 'create_game',
  ADD_SHIPS = 'add_ships',
  START_GAME = 'start_game',
  TURN = 'turn',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
  FINISH = 'finish',
  SINGLE_PLAY = 'single_play',
}

export const INVALID_PASSWORD_ERROR = 'Invalid password';
export const CREATE_ROOM_ERROR =
  'It is not allowed for a user to play in several rooms at the same time!';
