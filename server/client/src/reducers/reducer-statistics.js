import { UPDATE_STATS } from '../actions';

export default function(state = [], action) {
  if (action.error) return action.error;
  switch(action.type) {
    case UPDATE_STATS:
      return action.payload;
    default:
      return state;
  }
}