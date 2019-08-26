import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const CurrentGamestep = ({ gamestep }) => {
  return (
    <Gamestep>Current game step:  {gamestep}</Gamestep>
  )
};

const Gamestep = styled.div`
  color: white;
`;

function mapStateToProps(state) {
  return {
    gamestep: (state.statistics.length > 0) ? state.statistics[state.statistics.length-1].gameSteps : 0
  }
}

export default connect(mapStateToProps, null)(CurrentGamestep);