import { combineReducers } from 'redux';
import BoardReducer from './reducer-board';
import PlayerReducer from './reducer-player';
import LossReducer from './reducer-loss';
import StatisticsReducer from './reducer-statistics';

const rootReducer = combineReducers({
  board: BoardReducer,
  player: PlayerReducer,
  gameLost: LossReducer,
  statistics: StatisticsReducer
});

export default rootReducer;