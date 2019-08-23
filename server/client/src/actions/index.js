export const UPDATE = 'update';
export const UPDATE_STATS = 'update_stats';

export function updateBoard(newState) {
  console.log('data in action: ', newState);
  return {
    type: UPDATE,
    payload: newState
  }
};

export function updateStats(newStats) {
  return {
    type: UPDATE_STATS,
    payload: newStats
  }
}