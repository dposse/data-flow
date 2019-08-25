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
import useSocket from '../hooks/useSocket';

const App = ({ updateBoard, updateStats, setBot, clearCharts, gameLost }) => {
  const [socket] = useSocket('http://localhost:5000');

  socket.connect();

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

  useEffect(() => {
    socket.on('state', (message) => {
      updateBoard(message);
    });
  
    socket.on('statistics', (data) => {
      console.log(data);
      updateStats(data);
    });
  
    socket.on('bot-stats', (data) => {
      console.log(data);
    });
  
    socket.on('changed-bot', (bot) => {
      setBot(bot);
      //want to clear stats for performance
      // clearCharts();
    });
  }, 0);

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
    </Container>
  );
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
