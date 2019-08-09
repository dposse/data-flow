import React, { useState, useEffect } from 'react';
import socket from './socket/socket';



socket.on('stuff', (message) => {
  console.log(`got stuff: `, message);
});

const App = () => {
  const startStream = () => {
    console.log('sending start stream to server');
    socket.emit('stream-start');
  };

  const endStream = () => {
    console.log('sending end stream to server');
    socket.emit('stream-end');
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={startStream}>start stream</button>
        <button onClick={endStream}>end stream</button>
      </header>
    </div>
  );
}

export default App;
