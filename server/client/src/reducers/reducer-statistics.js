import { UPDATE_STATS, CLEAR_CHARTS } from '../actions';

export default function(state = [], action) {
  if (action.error) return action.error;
  switch(action.type) {
    case UPDATE_STATS:
      return action.payload;
    case CLEAR_CHARTS:
      console.log(`clear charts reducer`, state);
      return [];
    default:
      return state;
  }
}