import { UPDATE } from '../actions';

export default function (state = false, action) {
  if (action.error) return action.error;
  switch (action.type) {
    case UPDATE:
      return action.payload.lost;
    default:
      return state;
  }
}