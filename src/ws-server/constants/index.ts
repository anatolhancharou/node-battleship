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

export enum ShotStatuses {
  MISS = 'miss',
  KILLED = 'killed',
  SHOT = 'shot',
}

export const MIN_CELL_COORDINATE = 0;
export const MAX_CELL_COORDINATE = 9;
export const TOTAL_SHIPS_COUNT = 10;

export const INVALID_PASSWORD_ERROR = 'Invalid password';
export const CREATE_ROOM_ERROR =
  'It is not allowed for a user to play in several rooms at the same time!';
export const ADD_USER_ERROR = 'The user is already in the room!';
