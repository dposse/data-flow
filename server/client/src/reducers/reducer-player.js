import { MOVE_PLAYER_LEFT } from '../actions';

const INITIAL_PLAYER_STATE = {
  position: 4,
  onGround: true
};

export default function (state = INITIAL_PLAYER_STATE, action) {
  if (action.error) return action.error;
  switch(action.type) {
    case MOVE_PLAYER_LEFT:
      return state;
    default:
      return state;
  }
}