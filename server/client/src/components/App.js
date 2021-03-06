import React, { useState, useEffect } from 'react';
import Board from './Board';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateBoard, updateStats, updateLastMove, updateBotStats, setBot, clearCharts } from '../actions';
import { Container, Row, Col } from 'react-bootstrap';
import Title from './Title';
import RunOptions from './RunOptions';
import StreamOutput from './StreamOutput';
import CurrentGamestep from './CurrentGamestep';
import CurrentGameActionMovementBarChart from './charts/CurrentGameActionMovementBarChart';
import CurrentGameTilePieChart from './charts/CurrentGameTilePieChart';
import GamestepsLineChart from './charts/GamestepsLineChart';
import ActionMovementBarChart from './charts/ActionMovementBarChart';
import TilePieChart from './charts/TilePieChart';
import useSocket from '../hooks/useSocket';
import SpiderChart from './charts/SpiderChart';

const App = ({ updateBoard, updateStats, updateLastMove, updateBotStats, setBot, clearCharts, gameLost }) => {
  document.body.style.backgroundColor = '#7cacec';
  
  const [socket] = useSocket(
    (process.env.NODE_ENV === 'production') ? process.env.PORT : 'http://localhost:5000'
  );

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
      updateLastMove(message.lastMove);
    });
  
    socket.on('statistics', (data) => {
      console.log(data);
      updateStats(data);
    });
  
    socket.on('bot-stats', (data) => {
      console.log(data);
      updateBotStats(data);
    });
  
    socket.on('changed-bot', (bot) => {
      setBot(bot);
      //want to clear stats for performance
      // clearCharts();
    });
  }, 0);

  return (
    <Container fluid={true}>
      <Row style={{marginTop: '20px'}}>
        <Col>
          <Title />
          <RunOptions 
            startSimulation={startSimulation} 
            endSimulation={endSimulation} 
            useRandomBot={useRandomBot}
            useMLBot1={useMLBot1}
            useMLBot2={useMLBot2}
          />
          <StreamOutput />
        </Col>
        <Col>
          <Board />
        </Col>
        <Col>
          <SpiderChart />
        </Col>
      </Row>
      <Row style={{marginLeft: '1px', marginRight: '1px', paddingTop: '10px', marginTop: '20px', backgroundColor: 'white', height: '430px'}}>
        <Col>
          <CurrentGamestep />
        </Col>
        <Col>
          <CurrentGameActionMovementBarChart />
        </Col>
        <Col>
          <CurrentGameTilePieChart />
        </Col>
      </Row>
      <Row style={{marginLeft: '1px', marginRight: '1px', marginBottom: '20px', paddingTop: '20px', marginTop: '20px', backgroundColor: 'white', height: '430px'}}>
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
  return bindActionCreators({ updateBoard, updateStats, updateLastMove, updateBotStats, setBot, clearCharts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
