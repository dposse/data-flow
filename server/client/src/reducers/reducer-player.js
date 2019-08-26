import { UPDATE } from '../actions';

const INITIAL_PLAYER_STATE = {
  position: 5,
  onGround: true
};

export default function (state = INITIAL_PLAYER_STATE, action) {
  if (action.error) return action.error;
  switch(action.type) {
    case UPDATE:
      return {...state, position: action.payload.playerPosition};
    default:
      return state;
  }
}