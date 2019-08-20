const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 5000;
const WALL_SIZE = 5;

const INITIAL_BOARD_STATE = [
  [0,0,0,0,0],  
  [0,0,0,0,0],  
  [0,0,0,0,0],  
  [0,0,0,0,0],
  [0,0,0,0,0]
];

//middle starting position - 0 leftmost, 4 rightmost positions on 5 tile board
const INITIAL_PLAYER_POSITION = 2;

io.on('connection', (socket) => {
  let board = INITIAL_BOARD_STATE;
  let playerPosition = INITIAL_PLAYER_POSITION;
  let nextAction = 'none';
  let endGame;
  
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //listen for events from client
  socket.on('game-start', () => {
    //wall boolean - want to send alternating data and empty array
    let wall = true;
    //send data Game to client
    console.log('received game-start message');
    endGame = setInterval(() => {
      //update game board every tick
      board = updateBoard(board, wall);
      wall = !wall;

      //move player based on nextAction
      switch (nextAction) {
        case 'left':
          playerPosition = moveLeft(playerPosition);
          console.log(`new player position: ${playerPosition}`);
          break;
        case 'right':
            playerPosition = moveRight(playerPosition);
            console.log(`new player position: ${playerPosition}`);
          break;
        case 'none':
        default:
          console.log(`no player movement`);
          break;
      }

      //check for collision

      //send to client
      
      
      
      //set nextAction to none every tick so player doesn't just keep moving in one direction
      nextAction = 'none';
    }, 1000);
  });

  socket.on('game-end', () => {
    console.log(`received game-end message`);
    clearInterval(endGame);
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