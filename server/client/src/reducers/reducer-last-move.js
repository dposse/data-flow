import { UPDATE_LAST_MOVE } from '../actions';

export default function (state = 'none', action) {
  if (action.error) return action.error;
  switch (action.type) {
    case UPDATE_LAST_MOVE:
      return action.payload;
    default:
      return state;
  }
}