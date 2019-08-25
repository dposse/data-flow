import { SET_BOT } from '../actions';

export default function (state = 'none', action) {
  if (action.error) return action.error;
  switch (action.type) {
    case SET_BOT:
      return action.payload;
    default:
      return state;
  }
}