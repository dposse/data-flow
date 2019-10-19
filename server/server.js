const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const gameConstants = require('./gameConstants');
const RandomBotPlayer = require('./players/RandomBotPlayer');
const MLPlayer = require('./players/MLPlayer');
const MLPlayer2 = require('./players/MLPlayer2');

// need to send built react spa to browser on first load
// usual cors and bodyparser just in case
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('server/client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'server/client', 'build', 'index.html'));
  });
}





//////////////////////////////////////////////////////////////////
// below is simulation

const PORT = process.env.PORT || 5000;
let simulationRunning = false;

//initialize player to MLBot (1), but can be changed through sockets
let player = new MLPlayer();

const statistics = [];
const playerStatistics = {
  randomBot: {
    steps: 0,
    tilesSeen: 0,
    movement: {
      leftDistance: 0,
      rightDistance: 0
    }
  },
  mlBot1: {
    steps: 0,
    tilesSeen: 0,
    movement: {
      leftDistance: 0,
      rightDistance: 0
    }
  },
  mlBot2: {
    steps: 0,
    tilesSeen: 0,
    movement: {
      leftDistance: 0,
      rightDistance: 0
    }
  }
};
let currentGameStatistics;

let board;
let playerPosition;
let nextAction;
let lastMove = 'none';
let endGame;


const initializeGame = () => {
  board = gameConstants.INITIAL_BOARD_STATE;
  playerPosition = gameConstants.INITIAL_PLAYER_POSITION;
  nextAction = 'none';
  currentGameStatistics = {
    gameSteps: 0,
    tiles: {
      total: 0,
      open: 0,
      closed: 0,
      percentOpen: 0,
      percentClosed: 0,
      chanceOfTile: gameConstants.CHANCE_OF_TILE
    },
    actions: {
      total: 0,
      numberOfLeftInputs: 0,
      numberOfRightInputs: 0,
      // if an ml model can choose no movement, add here
      percentLeftInput: 0,
      percentRightInput: 0
    },
    movement: {
      total: 0,
      leftDistance: 0,
      rightDistance: 0,
      percentLeftMovement: 0,
      percentRightMovement: 0
    }
  };
  // game starts with NxN open tiles
  currentGameStatistics.tiles.total += (gameConstants.WALL_SIZE * gameConstants.WALL_SIZE);
  currentGameStatistics.tiles.open += (gameConstants.WALL_SIZE * gameConstants.WALL_SIZE);
  statistics.push(currentGameStatistics);
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
  await player.initialize();
  await runGame(player);
  player.stop();
};


//below should be initialized in human player, leaving for now
io.on('connection', (socket) => {  
  console.log('user connected');
  socket.emit('changed-bot', 'machine learning bot 1');
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

  //setting bot options
  socket.on('use-random-bot', () => {
    console.log(`received use-random-bot message`);
    player = new RandomBotPlayer();
    socket.emit('changed-bot', 'random bot');
  });

  socket.on('use-ml-bot-1', () => {
    console.log(`received use-ml-bot-1`);
    player = new MLPlayer();
    socket.emit('changed-bot', 'machine learning bot 1');
  });

  socket.on('use-ml-bot-2', () => {
    console.log(`received use-ml-bot-2`);
    player = new MLPlayer2();
    socket.emit('changed-bot', 'machine learning bot 2');
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
        //add statistics for each action
        switch (player.getMove()) {
          case 'left':
            console.log(`next action set to left`);
            playerPosition = moveLeft(playerPosition);
            currentGameStatistics.actions.numberOfLeftInputs++;
            lastMove = 'left';
            console.log(`new player position: ${playerPosition}`);
            break;
          case 'right':
            console.log(`next action set to right`);
            playerPosition = moveRight(playerPosition);
            currentGameStatistics.actions.numberOfRightInputs++;
            lastMove = 'right';
            console.log(`new player position: ${playerPosition}`);
            break;
          case 'none':
          default:
            lastMove = 'none';
            console.log(`no player movement`);
            break;
        }

        updateInputPercentages();
        
        //check for collision
        if (playerCollided(board, playerPosition)) {
          //end game
          clearInterval(endGame);
          console.log(`collision, game lost`);
          //send board and player state to client with endgame response
          io.sockets.emit('state', { board, playerPosition, lost: true, lastMove: lastMove });
          //update and send statistics
          io.sockets.emit('statistics', statistics);
          io.sockets.emit('bot-stats', playerStatistics);
          //break out of loop
          resolve();
          return;
        }
    
        //send state to client
        console.log(lastMove);
        io.sockets.emit('state', { board, playerPosition, lost: false, lastMove: lastMove });

        //update state of player, i.e. player.updateGameState()
        player.updateGameState(board, playerPosition);
        
        //set nextAction to none every tick so player doesn't just keep moving in one direction
        nextAction = 'none';
        gamestep++;
        //update statistics
        currentGameStatistics.gameSteps = gamestep;
        updateTilePercents();
        updateMovementPercents();
        currentGameStatistics.actions.total++;
        playerStatistics[player.getName()].steps = gamestep;
        //send statistics to client
        io.sockets.emit('statistics', statistics);
        io.sockets.emit('bot-stats', playerStatistics);
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
  currentGameStatistics.tiles.total += gameConstants.WALL_SIZE;

  //add last row
  if (counter % 3 === 0) {
    newBoard.push(tileArray(gameConstants.WALL_SIZE));
    newBoard[gameConstants.WALL_SIZE-1].forEach((tile) => {
      if (tile === 0) {
        currentGameStatistics.tiles.open++;
      } else if (tile === 1) { //adding if here in case adding new tiles in the future
        currentGameStatistics.tiles.closed++;
        playerStatistics[player.getName()].tilesSeen++;
      }
    });
  } else {
    newBoard.push(emptyArray(gameConstants.WALL_SIZE));
    currentGameStatistics.tiles.open += gameConstants.WALL_SIZE;
  }

  return newBoard;
};

//like above no longer pure because affecting statistics object
const moveLeft = (currentPosition) => {
  if (currentPosition === 0) {
    return 0;
  } else {
    currentGameStatistics.movement.total++;
    currentGameStatistics.movement.leftDistance++;
    playerStatistics[player.getName()].movement.leftDistance++;
    return currentPosition - 1;
  }
};

const moveRight = (currentPosition) => {
  if (currentPosition === (gameConstants.WALL_SIZE - 1)) {
    return gameConstants.WALL_SIZE - 1;
  } else {
    currentGameStatistics.movement.total++;
    currentGameStatistics.movement.rightDistance++;
    playerStatistics[player.getName()].movement.rightDistance++;
    return currentPosition + 1;
  }
};

const playerCollided = (currentBoard, currentPosition) => {
  if (currentBoard[0][currentPosition] === 1) {
    return true;
  } else {
    return false;
  }
};

const getAverageFromArray = (array) => {
  const sum = array.reduce((acc, curr) => acc + curr);
  return sum / array.length;
};

const updateTilePercents = () => {
  currentGameStatistics.tiles.percentOpen = currentGameStatistics.tiles.open / currentGameStatistics.tiles.total;
  currentGameStatistics.tiles.percentClosed = currentGameStatistics.tiles.closed / currentGameStatistics.tiles.total;
};

const updateInputPercentages = () => {
  currentGameStatistics.actions.percentLeftInput = currentGameStatistics.actions.numberOfLeftInputs / currentGameStatistics.actions.total;
  currentGameStatistics.actions.percentRightInput = currentGameStatistics.actions.numberOfRightInputs / currentGameStatistics.actions.total;
};

const updateMovementPercents = () => {
  currentGameStatistics.movement.percentLeftMovement = currentGameStatistics.movement.leftDistance / currentGameStatistics.movement.total;
  currentGameStatistics.movement.percentRightMovement = currentGameStatistics.movement.rightDistance / currentGameStatistics.movement.total;
};