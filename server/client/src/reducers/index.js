import { combineReducers } from 'redux';
import BoardReducer from './reducer-board';
import PlayerReducer from './reducer-player';

const rootReducer = combineReducers({
  board: BoardReducer,
  player: PlayerReducer
});

export default rootReducer;