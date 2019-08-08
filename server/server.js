const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 5000;
const WALL_SIZE = 10;

io.on('connection', (socket) => {
  let endStream;
  
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //listen for events from client
  socket.on('stream-start', () => {
    //send data stream to client
    endStream = setInterval(() => {
      socket.emit('stuff', tileArray(WALL_SIZE));
    }, 100);
  });

  socket.on('stream-end', () => {
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