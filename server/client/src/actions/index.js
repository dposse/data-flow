export const UPDATE = 'update';

export function updateBoard(newState) {
  console.log('data in action: ', newState);
  return {
    type: UPDATE,
    payload: newState
  }
};