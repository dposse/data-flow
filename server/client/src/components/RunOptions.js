import React, {Fragment} from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { connect } from 'react-redux';

const RunOptions = ({ startSimulation, endSimulation, useRandomBot, useMLBot1, useMLBot2, currentBot }) => (
  <Fragment>
    <ButtonToolbar>
      <StyledButton size='sm' onClick={startSimulation} 
        style={{marginRight: '10px'}}>
          start simulation
      </StyledButton>
      <StyledButton size='sm' onClick={endSimulation} >
          end simulation
      </StyledButton>
    </ButtonToolbar>
    <small style={{color: 'white'}}>Current Bot: {currentBot}</small>
    <ButtonToolbar>
      <StyledButton size='sm' onClick={useRandomBot}>
        Use Random Bot
      </StyledButton>
      <StyledButton size='sm' onClick={useMLBot1}>
        Use Machine Learning Bot 1
      </StyledButton>
      <StyledButton size='sm' onClick={useMLBot2}>
        Use Machine Learning Bot 2
      </StyledButton>
    </ButtonToolbar>
  </Fragment>
);

const StyledButton = styled(Button)`
  background-color: #7cacec;
  border: 1px solid white;
  margin-top: 5px;
  margin-right: 5px;

  :hover {
    background-color: #609beb;
    border: 1px solid white;
  }

  :active, :focus {
    background-color: #1f82ed !important;
    border: 1px solid white !important;
    box-shadow: none !important;
  }

  :focus {
    box-shadow: none;
  }
`;

function mapStateToProps(state) {
  return {
    currentBot: state.currentBot
  }
}

export default connect(mapStateToProps, null)(RunOptions);