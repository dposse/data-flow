import React, {Fragment} from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { connect } from 'react-redux';

const RunOptions = ({ startSimulation, endSimulation, useRandomBot, useMLBot1, currentBot }) => (
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
    Current Bot: {currentBot}
    <ButtonToolbar>
      <StyledButton size='sm' onClick={useRandomBot}>
        Use Random Bot
      </StyledButton>
      <StyledButton size='sm' onClick={useMLBot1}>
        Use Machine Learning Bot 1
      </StyledButton>
    </ButtonToolbar>
  </Fragment>
);

const StyledButton = styled(Button)`
  background-color: rgb(124, 181, 236);
  border: none;
`;

function mapStateToProps(state) {
  return {
    currentBot: state.currentBot
  }
}

export default connect(mapStateToProps, null)(RunOptions);