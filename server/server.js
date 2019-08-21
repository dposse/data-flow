const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const RandomBotPlayer = require('./players/RandomBotPlayer');

const PORT = 5000;
const WALL_SIZE = 5;
const GAME_TICK = 1000;

const INITIAL_BOARD_STATE = [
  [0,0,0,0,0],  
  [0,0,0,0,0],  
  [0,0,0,0,0],  
  [0,0,0,0,0],
  [0,0,0,0,0]
];
//middle starting position - 0 leftmost, 4 rightmost positions on 5 tile board
const INITIAL_PLAYER_POSITION = 2;

let board = INITIAL_BOARD_STATE;
let playerPosition = INITIAL_PLAYER_POSITION;
let nextAction = 'none';
let endGame;

const main = async () => {
  //main doesn't know/care if its bot or human
  const player = new RandomBotPlayer();
  await player.initialize();
  await runGame(player);
  player.stop();
};



// io.on('connection', (socket) => {
  
  
//   console.log('user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   //listen for events from client
//   socket.on('game-start', runGame);

//   socket.on('game-end', () => {
//     console.log(`received game-end message`);
//     clearInterval(endGame);
//     board = INITIAL_BOARD_STATE;
//     playerPosition = INITIAL_PLAYER_POSITION;
//     nextAction = 'none';
//   });

//   //movement input from front end
//   socket.on('move-left', () => {
//     console.log(`received move-left message`);
//     nextAction = 'left';
//     console.log(`nextAction: ${nextAction}`);
//   });

//   socket.on('move-right', () => {
//     console.log(`received move-right message`);
//     nextAction = 'right';
//     console.log(`nextAction: ${nextAction}`);
//   });
// });

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// helper functions ////////////////////////////////////////////////
const runGame = (player) => {
  return new Promise((resolve, reject) => {
      console.log(`called runGame`);
      //wall boolean - want to send alternating data and empty array
      let wall = true;
      //send data Game to client
      console.log('received game-start message');
      endGame = setInterval(() => {
        //update game board every tick
        board = updateBoard(board, wall);
        wall = !wall;
    
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
          //send board and player state to client with endgame response
          io.sockets.emit('state', { board, playerPosition, lost: true })
          //break out of loop
          resolve();
          return;
        }
    
        //send to client
        io.sockets.emit('state', { board, playerPosition, lost: false });
        //update state of player, i.e. player.updateGameState()
        player.updateGameState();
        
        //set nextAction to none every tick so player doesn't just keep moving in one direction
        nextAction = 'none';
      }, GAME_TICK);
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

const updateBoard = (currentBoard, wall) => {
  //remove first row
  const newBoard = currentBoard.slice(1);      

  //add last row
  if (wall) {
    newBoard.push(tileArray(WALL_SIZE));
  } else {
    newBoard.push(emptyArray(WALL_SIZE));
  }

  return newBoard;
};

const moveLeft = (currentPosition) => {
  return (currentPosition === 0) ? 0 : currentPosition - 1;
}

const moveRight = (currentPosition) => {
  return (currentPosition === (WALL_SIZE - 1)) ? (WALL_SIZE - 1) : currentPosition + 1;
}

const playerCollided = (currentBoard, currentPosition) => {
  if (currentBoard[0][currentPosition] === 1) {
    return true;
  } else {
    return false;
  }
}




main();