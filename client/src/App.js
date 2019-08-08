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
  const emitClick = () => {
    console.log('sending test click to server');
    socket.emit('gamestart');
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={emitClick}>emit stuff</button>
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
