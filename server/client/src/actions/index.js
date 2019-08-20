export const UPDATE_BOARD = 'update_board';
export const MOVE_PLAYER_LEFT = 'move_player_left';

export function updateBoard(newState) {
  console.log('data in action: ', newState);
  return {
    type: UPDATE_BOARD,
    payload: newState
  }
};