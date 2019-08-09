import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const SOCKET_PORT = 5000;

const io = require('socket.io-client');
const socket = io(`http://localhost:${SOCKET_PORT}`);

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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
