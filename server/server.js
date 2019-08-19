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
  let endStream;
  
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //listen for events from client
  socket.on('stream-start', () => {
    //wall boolean - want to send alternating data and empty array
    let wall = true;
    //send data stream to client
    console.log('received stream-start message');
    endStream = setInterval(() => {
      if (wall) {
        socket.emit('stuff', tileArray(WALL_SIZE));
        wall = !wall;
      } else {
        socket.emit('stuff', emptyArray(WALL_SIZE));
        wall = !wall;
      }
    }, 300);
  });

  socket.on('stream-end', () => {
    console.log(`received stream-end message`);
    clearInterval(endStream);
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