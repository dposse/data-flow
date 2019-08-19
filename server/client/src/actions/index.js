export const UPDATE_BOARD = 'update_board';
export const MOVE_PLAYER_LEFT = 'move_player_left';

export function updateBoard(newArray) {
  // console.log('data in action: ', newArray);
  return {
    type: UPDATE_BOARD,
    payload: newArray
  }
};

export function movePlayer(movement) {
  return {
    type: MOVE_PLAYER_LEFT,
    payload: movement
  }
};