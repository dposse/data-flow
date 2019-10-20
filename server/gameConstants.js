const WALL_SIZE = 10;

let board = [];
for (let i=0; i<WALL_SIZE; i++) {
  let row = [];
  for (let j=0; j<WALL_SIZE; j++) {
    row.push(0);
  }
  board.push(row);
}

module.exports = {
  WALL_SIZE: WALL_SIZE,
  GAME_TICK: 500,
  INITIAL_BOARD_STATE: board,
  INITIAL_PLAYER_POSITION: Math.floor(WALL_SIZE/2),
  CHANCE_OF_TILE: .5
};