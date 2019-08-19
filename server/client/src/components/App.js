import React, { Fragment } from 'react';
import Board from './Board';
import socket from '../socket/socket';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateBoard } from '../actions';



const App = ({ updateBoard }) => {
  //sockets should be handled in relevant components
  const startStream = () => {
    console.log('sending start stream to server');
    socket.emit('stream-start');
  };

  const endStream = () => {
    console.log('sending end stream to server');
    socket.emit('stream-end');
  };

  socket.on('stuff', (message) => {
    // console.log(`got stuff: `, message);
    updateBoard(message);
  });

  return (
    <Fragment>
      <button onClick={startStream}>start stream</button>
      <button onClick={endStream}>end stream</button>
      <Board />
    </Fragment>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateBoard }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
