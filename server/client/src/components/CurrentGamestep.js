import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const CurrentGamestep = ({ gamestep }) => {
  return (
    <Wrapper>
      <Title>Current game step</Title>
      <Number>{gamestep}</Number>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  text-align: center;
  color: #333333;
  font-family: "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif;
  font-weight: 400;
  padding-top: 5px;
`;

const Title = styled.div`
  font-size: 18px;
`;

const Number = styled.div`
  margin-top: 40px;
  font-size: 180px;
`;

function mapStateToProps(state) {
  return {
    gamestep: (state.statistics.length > 0) ? state.statistics[state.statistics.length-1].gameSteps : 0
  }
}

export default connect(mapStateToProps, null)(CurrentGamestep);