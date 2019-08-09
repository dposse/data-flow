import React, { Fragment } from 'react';
import Board from './Board';
import socket from '../socket/socket';

//sockets should be handled in relevant components
// socket.on('stuff', (message) => {
//   console.log(`got stuff: `, message);
// });

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
    <Fragment>
      <Board />
      <button onClick={startStream}>start stream</button>
      <button onClick={endStream}>end stream</button>
    </Fragment>
  );
}

export default App;
