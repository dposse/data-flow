import React, { Fragment, useState, useEffect } from 'react';
import Board from './Board';
import socket from '../socket/socket';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateBoard } from '../actions';



const App = ({ updateBoard, gameLost }) => {
  //sockets should be handled in relevant components
  const startSimulation = () => {
    console.log('sending start simulation to server');
    socket.emit('simulation-start');
  };

  const endSimulation = () => {
    console.log('sending end simulation to server');
    socket.emit('simulation-end');
  };

  const sendLeftInput = () => {
    console.log(`sending left input to server`);
    socket.emit('move-left');
  };

  const sendRightInput = () => {
    console.log(`sending right input to server`);
    socket.emit('move-right');
  };

  socket.on('state', (message) => {
    console.log(`received board state: `, message);
    updateBoard(message);
  });

  //set keypresses to look out for
  const aKey = useKeyPress('a');
  const dKey = useKeyPress('d');
  const leftKey = useKeyPress('ArrowLeft');
  const rightKey = useKeyPress('ArrowRight');

  return (
    <Fragment>
      <button onClick={startSimulation}>start simulation</button>
      <button onClick={endSimulation}>end simulation</button>
      <Board />
      {aKey && sendLeftInput()}
      {dKey && sendRightInput()}
      {leftKey && sendLeftInput()}
      {rightKey && sendRightInput()}
      {gameLost && <div style={{marginTop: '250px'}}>game has been lost</div>}
    </Fragment>
  );
}

//react hook - out here, following recipe usehooks.com/useKeyPress
const useKeyPress = (targetKey) => {
  //set hooks for moving left and right - a, d (from wasd), left, or right
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  //event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    }
  }, []); //empty array => effect only run on mount/unmount

  return keyPressed;
}

function mapStateToProps(state) {
  return {
    gameLost: state.gameLost
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateBoard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
