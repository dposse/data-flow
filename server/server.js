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
  gamesPlayed: 0
};

const initializeGame = () => {
  board = gameConstants.INITIAL_BOARD_STATE;
  playerPosition = gameConstants.INITIAL_PLAYER_POSITION;
  nextAction = 'none';
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
      //wall boolean - want to send alternating data and empty array
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
            console.log(`new player position: ${playerPosition}`);
            break;
          case 'right':
            console.log(`next action set to right`);
            playerPosition = moveRight(playerPosition);
            console.log(`new player position: ${playerPosition}`);
            break;
          case 'none':
          default:
            console.log(`no player movement`);
            break;
        }
    
        //check for collision
        if (playerCollided(board, playerPosition)) {
          //end game
          clearInterval(endGame);
          console.log(`collision, game lost`);
          //send board and player state to client with endgame response
          io.sockets.emit('state', { board, playerPosition, lost: true });
          //update and send statistics
          statistics.gamesPlayed++;
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
        //send statistics to client
        io.sockets.emit('statistics', statistics);
      }, gameConstants.GAME_TICK);
  });
}

//create random tileArray
const tileArray = (size) => {
  const array = [];
  for (let i=0; i<size; i++) {
    array.push(Math.round(Math.random()));
  }    
  return array;
};

const emptyArray = (size) => {
  const array = [];
  for (let i=0; i<size; i++) {
    array.push(0);
  }
  return array;
};

const updateBoard = (currentBoard, counter) => {
  //remove first row
  const newBoard = currentBoard.slice(1);      

  //add last row
  if (counter % 3 === 0) {
    newBoard.push(tileArray(gameConstants.WALL_SIZE));
  } else {
    newBoard.push(emptyArray(gameConstants.WALL_SIZE));
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




// main();