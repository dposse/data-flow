export const UPDATE = 'update';
export const UPDATE_STATS = 'update_stats';
export const SET_BOT = 'set_bot';
export const CLEAR_CHARTS = 'clear_charts';

export function updateBoard(newState) {
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
};

export function setBot(bot) {
  return {
    type: SET_BOT,
    payload: bot
  }
};

export function clearCharts() {
  console.log(`clear charts action`);
  return {
    type: CLEAR_CHARTS,
    payload: null
  }
}