import { UPDATE_STATS } from '../actions';

export default function(state = [], action) {
  if (action.error) return action.error;
  switch(action.type) {
    case UPDATE_STATS:
      console.log(`in reducer`, action);
      return action.payload;
    default:
      return state;
  }
}