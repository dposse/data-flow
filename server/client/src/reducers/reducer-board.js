import { UPDATE } from '../actions';

//create initial board, all 0's
const INITIAL_BOARD_STATE = [
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0]
];


export default function (state = INITIAL_BOARD_STATE, action) {
  if (action.error) return action.error;
  switch (action.type) {
    case UPDATE:
      console.log('data in reducer: ', action.payload.board);
      return action.payload.board;
    default:
      return state;
  }
}