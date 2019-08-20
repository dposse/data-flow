import { UPDATE } from '../actions';

const INITIAL_PLAYER_STATE = {
  position: 2,
  onGround: true
};

export default function (state = INITIAL_PLAYER_STATE, action) {
  if (action.error) return action.error;
  switch(action.type) {
    case UPDATE:
      console.log('data in reducer: ', action.payload.playerPosition);
      return {...state, position: action.payload.playerPosition};
    default:
      return state;
  }
}