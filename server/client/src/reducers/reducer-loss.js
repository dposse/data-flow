import { UPDATE } from '../actions';

export default function (state = false, action) {
  if (action.error) return action.error;
  switch (action.type) {
    case UPDATE:
      console.log('data in reducer: ', action.payload.lost);
      console.log(`\n\n\n`);
      return action.payload.lost;
    default:
      return state;
  }
}