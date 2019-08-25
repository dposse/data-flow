import React, { Fragment, useState, useEffect } from 'react';
import Board from './Board';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateBoard, updateStats } from '../actions';
import { Container, Row, Col } from 'react-bootstrap';
import GamestepsLineChart from './charts/GamestepsLineChart';
import Heatmap from './charts/Heatmap';
import ActionMovementBarChart from './charts/ActionMovementBarChart';
import TilePieChart from './charts/TilePieChart';

const io = require('socket.io-client');
const SOCKET_PORT = 5000;

const socket = io(`http://localhost:${SOCKET_PORT}`);

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

const App = ({ updateBoard, updateStats, gameLost }) => {
  socket.on('state', (message) => {
    updateBoard(message);
  });

  socket.on('statistics', (data) => {
    updateStats(data);
  });

  //set keypresses to look out for
  const aKey = useKeyPress('a');
  const dKey = useKeyPress('d');
  const leftKey = useKeyPress('ArrowLeft');
  const rightKey = useKeyPress('ArrowRight');

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <button onClick={startSimulation}>start simulation</button>
          <button onClick={endSimulation}>end simulation</button>
          <Board />
        </Col>
        <Col>{gameLost && <div>game has been lost</div>}</Col>
      </Row>
      <Row style={{marginTop: '400px'}}>
        <Col>
          <GamestepsLineChart />
        </Col>
        <Col>
          <ActionMovementBarChart />
        </Col>
        <Col>
          <TilePieChart />
        </Col>
      </Row>
      
      
      {/* heatmap commented out as it is currently not working */}
      {/* <Heatmap /> */}
      {aKey && sendLeftInput()}
      {dKey && sendRightInput()}
      {leftKey && sendLeftInput()}
      {rightKey && sendRightInput()}
    </Container>
  );
}

//react hook - out here, following recipe usehooks.com/useKeyPress
const useKeyPress = (targetKey) => {
  //set hooks for moving left and right - a, d (from wasd), left, or right
  const [keyPressed, setKeyPressed] = useState(false);

  //event listeners
  useEffect(() => {

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

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    }
  }, [setKeyPressed, targetKey]); //empty array => effect only run on mount/unmount

  return keyPressed;
}

function mapStateToProps(state) {
  return {
    gameLost: state.gameLost
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateBoard, updateStats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
