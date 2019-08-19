const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 5000;
const WALL_SIZE = 10;

const INITIAL_BOARD_STATE = [
  [0,0,0,0,0],  
  [0,0,0,0,0],  
  [0,0,0,0,0],  
  [0,0,0,0,0],
  [0,0,0,0,0]
];

io.on('connection', (socket) => {
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
      if (wall) {
        socket.emit('stuff', tileArray(WALL_SIZE));
        wall = !wall;
      } else {
        socket.emit('stuff', emptyArray(WALL_SIZE));
        wall = !wall;
      }
    }, 300);
  });

  socket.on('game-end', () => {
    console.log(`received game-end message`);
    clearInterval(endGame);
  });

  //movement input from front end
  socket.on('move-left', () => {
    console.log(`received move-left message`);
  });

  socket.on('move-right', () => {
    console.log(`received move-right message`);
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