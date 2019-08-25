import React, { useState, useEffect } from 'react';
import Board from './Board';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateBoard, updateStats, setBot, clearCharts } from '../actions';
import { Container, Row, Col } from 'react-bootstrap';
import RunOptions from './RunOptions';
import PlayerInformation from './PlayerInformation';
import GamestepsLineChart from './charts/GamestepsLineChart';
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

//send commands to switch bots
const useRandomBot = () => {
  console.log(`sending use random bot to server`);
  socket.emit('use-random-bot');
};

const useMLBot1 = () => {
  console.log(`sending use machine learning bot 1 to server`);
  socket.emit('use-ml-bot-1');
};

const useMLBot2 = () => {
  console.log(`sending use machine learning bot 2 to server`);
  socket.emit('use-ml-bot-2');
};

// human movement - not currently used but leaving for the option
// const sendLeftInput = () => {
//   console.log(`sending left input to server`);
//   socket.emit('move-left');
// };

// const sendRightInput = () => {
//   console.log(`sending right input to server`);
//   socket.emit('move-right');
// };

const App = ({ updateBoard, updateStats, setBot, clearCharts, gameLost }) => {
  socket.on('state', (message) => {
    updateBoard(message);
  });

  socket.on('statistics', (data) => {
    updateStats(data);
  });

  socket.on('changed-bot', (bot) => {
    setBot(bot);
    //want to clear stats for performance
    // clearCharts();
  });

  // //set keypresses to look out for - left here in case i allow human players
  // const aKey = useKeyPress('a');
  // const dKey = useKeyPress('d');
  // const leftKey = useKeyPress('ArrowLeft');
  // const rightKey = useKeyPress('ArrowRight');

  return (
    <Container>
      <Row style={{marginTop: '20px'}}>
        <Col>
          <RunOptions 
            startSimulation={startSimulation} 
            endSimulation={endSimulation} 
            useRandomBot={useRandomBot}
            useMLBot1={useMLBot1}
            useMLBot2={useMLBot2}
          />
        </Col>
        <Col>
          <Board />
        </Col>
        <Col>
          <PlayerInformation />
        </Col>
      </Row>
      <Row style={{marginTop: '300px'}}>
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
      {/* {aKey && sendLeftInput()}
      {dKey && sendRightInput()}
      {leftKey && sendLeftInput()}
      {rightKey && sendRightInput()} 
      {gameLost && <div>game has been lost</div>}*/}
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
  return bindActionCreators({ updateBoard, updateStats, setBot, clearCharts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
