import { UPDATE_BOARD } from '../actions';

//create initial board, all 0's
const INITIAL_BOARD_STATE = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];


export default function (state = INITIAL_BOARD_STATE, action) {
  if (action.error) return action.error;
  switch (action.type) {
    case UPDATE_BOARD:
      // console.log('data in reducer: ', action.payload);
      const newState = state.slice(1);
      newState.push(action.payload);
      // console.log('new board: ', newState);
      return newState;
    default:
      console.log('reducer: ', action.payload);
      return state;
  }
}