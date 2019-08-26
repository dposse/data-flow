import { combineReducers } from 'redux';
import BoardReducer from './reducer-board';
import PlayerReducer from './reducer-player';
import LossReducer from './reducer-loss';
import StatisticsReducer from './reducer-statistics';
import BotReducer from './reducer-bot';
import BotStatsReducer from './reducer-botStats.js';

const rootReducer = combineReducers({
  board: BoardReducer,
  player: PlayerReducer,
  gameLost: LossReducer,
  statistics: StatisticsReducer,
  botStats: BotStatsReducer,
  currentBot: BotReducer
});

export default rootReducer;