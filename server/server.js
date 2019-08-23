const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const gameConstants = require('./gameConstants');
const RandomBotPlayer = require('./players/RandomBotPlayer');
const MLPlayer = require('./players/MLPlayer');

const PORT = 5000;
let simulationRunning = false;

let board;
let playerPosition;
let nextAction;
let endGame;

const statistics = {
  gamesPlayed: 0,
  gameSteps: {
    total: 0,
    currentGame: 0,
    highest: 0,
    average: 0,
    eachGame: []
  },
  tiles: {
    total: 0,
    open: 0,
    closed: 0,
    percentOpen: 0,
    percentClosed: 0
  },
  actions: {
    total: 0,
    numberOfLeftInputs: 0,
    numberOfRightInputs: 0,
    // if an ml model can choose no movement, add here
    percentLeftInput: 0,
    percentRightInput: 0
  }
};

const initializeGame = () => {
  board = gameConstants.INITIAL_BOARD_STATE;
  playerPosition = gameConstants.INITIAL_PLAYER_POSITION;
  nextAction = 'none';
  statistics.gameSteps.currentGame = 0;
  // game starts with NxN open tiles
  statistics.tiles.total += (gameConstants.WALL_SIZE * gameConstants.WALL_SIZE);
  statistics.tiles.open += (gameConstants.WALL_SIZE * gameConstants.WALL_SIZE);
}

const runSimulation = async () => {
  while (simulationRunning) {
    await main();
  }
};

const main = async () => {
  //not pure function, consider changing
  //needed to reset board/position between games while in continuous simulation loop
  initializeGame();
  //main doesn't know/care if its bot or human, change player between human/random/ml
  const player = new MLPlayer();
  await player.initialize();
  await runGame(player);
  player.stop();
};


//below should be initialized in human player, leaving for now
io.on('connection', (socket) => {  
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //listen for events from client
  socket.on('simulation-start', () => {
    simulationRunning = true;
    runSimulation();
  });

  socket.on('simulation-end', () => {
    console.log(`received simulation-end message`);
    simulationRunning = false;
  });

  //movement input from front end
  socket.on('move-left', () => {
    console.log(`received move-left message`);
    nextAction = 'left';
    console.log(`nextAction: ${nextAction}`);
  });

  socket.on('move-right', () => {
    console.log(`received move-right message`);
    nextAction = 'right';
    console.log(`nextAction: ${nextAction}`);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// helper functions ////////////////////////////////////////////////
const runGame = (player) => {
  return new Promise((resolve, reject) => {
      console.log(`called runGame`);
      let gamestep = 0;
      //send data Game to client
      console.log('received simulation-start message');
      endGame = setInterval(() => {
        //update game board every tick
        board = updateBoard(board, gamestep);
    
        //move player based on nextAction
        switch (player.getMove()) {
          case 'left':
            console.log(`next action set to left`);
            playerPosition = moveLeft(playerPosition);
            statistics.actions.numberOfLeftInputs++;
            console.log(`new player position: ${playerPosition}`);
            break;
          case 'right':
            console.log(`next action set to right`);
            playerPosition = moveRight(playerPosition);
            statistics.actions.numberOfRightInputs++;
            console.log(`new player position: ${playerPosition}`);
            break;
          case 'none':
          default:
            console.log(`no player movement`);
            break;
        }

        recalculateInputPercentages();
        
        //check for collision
        if (playerCollided(board, playerPosition)) {
          //end game
          clearInterval(endGame);
          console.log(`collision, game lost`);
          //send board and player state to client with endgame response
          io.sockets.emit('state', { board, playerPosition, lost: true });
          //update and send statistics
          statistics.gamesPlayed++;
          if (gamestep > statistics.gameSteps.highest) {
            statistics.gameSteps.highest = gamestep;
          }
          statistics.gameSteps.eachGame.push(gamestep);
          statistics.gameSteps.average = getAverageFromArray(statistics.gameSteps.eachGame);
          
          io.sockets.emit('statistics', statistics);
          //break out of loop
          resolve();
          return;
        }
    
        //send state to client
        io.sockets.emit('state', { board, playerPosition, lost: false });

        //update state of player, i.e. player.updateGameState()
        player.updateGameState(board, playerPosition);
        
        //set nextAction to none every tick so player doesn't just keep moving in one direction
        nextAction = 'none';
        gamestep++;
        //update statistics
        statistics.gameSteps.currentGame = gamestep;
        statistics.gameSteps.total++;
        updateTilePercents();
        statistics.actions.total++;
        //send statistics to client
        io.sockets.emit('statistics', statistics);
      }, gameConstants.GAME_TICK);
  });
}

//create random tileArray
const tileArray = (size) => {
  let array;
  let impossible;

  do {
    array = [];
    for (let i=0; i<size; i++) {
      array.push(Math.round(Math.random()));
    }
    // for now saying that any array with an open space is possible. all 1's clearly impossible
    impossible = array.reduce((acc, curr) => {
      if (curr === 0) {
        return false;
      }
      return acc;
    }, true);
  } while (impossible);
  
  return array;
};

const emptyArray = (size) => {
  const array = [];
  for (let i=0; i<size; i++) {
    array.push(0);
  }
  return array;
};

//no longer pure because updating statistics object - refactor possible
const updateBoard = (currentBoard, counter) => {
  //remove first row
  const newBoard = currentBoard.slice(1);   
  //no matter what total tiles += wallsize   
  statistics.tiles.total += gameConstants.WALL_SIZE;

  //add last row
  if (counter % 3 === 0) {
    newBoard.push(tileArray(gameConstants.WALL_SIZE));
    newBoard[gameConstants.WALL_SIZE-1].forEach((tile) => {
      if (tile === 0) {
        statistics.tiles.open++;
      } else if (tile === 1) { //adding if here in case adding new tiles in the future
        statistics.tiles.closed++;
      }
    });
  } else {
    newBoard.push(emptyArray(gameConstants.WALL_SIZE));
    statistics.tiles.open += gameConstants.WALL_SIZE;
  }

  return newBoard;
};

const moveLeft = (currentPosition) => {
  return (currentPosition === 0) ? 0 : currentPosition - 1;
}

const moveRight = (currentPosition) => {
  return (currentPosition === (gameConstants.WALL_SIZE - 1)) ? (gameConstants.WALL_SIZE - 1) : currentPosition + 1;
}

const playerCollided = (currentBoard, currentPosition) => {
  if (currentBoard[0][currentPosition] === 1) {
    return true;
  } else {
    return false;
  }
}

const getAverageFromArray = (array) => {
  const sum = array.reduce((acc, curr) => acc + curr);
  return sum / array.length;
};

const updateTilePercents = () => {
  statistics.tiles.percentOpen = statistics.tiles.open / statistics.tiles.total;
  statistics.tiles.percentClosed = statistics.tiles.closed / statistics.tiles.total;
};

const recalculateInputPercentages = () => {
  statistics.actions.percentLeftInput = statistics.actions.numberOfLeftInputs / statistics.actions.total;
  statistics.actions.percentRightInput = statistics.actions.numberOfRightInputs / statistics.actions.total;
};


// main();