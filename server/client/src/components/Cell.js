import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import dog from '../assets/Dog.gif';
import downdog from '../assets/DogLyingDown.png';

const CELL_SIZE = 40;

const Cell = ({ x, y, value, hasPlayer }) => {
  //set individual cell positions and size
  const left = CELL_SIZE * x + 1;
  const top = CELL_SIZE * y + 1;
  const width = CELL_SIZE - 1;
  const height = CELL_SIZE - 1;
  let cellColor;

  if (value === 1) {
    cellColor = 'turquoise';
  } else {
    cellColor = 'white';
  }

  const CellDiv = styled.div`
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    width: ${width}px;
    height: ${height}px;
    border: 1px solid black;
    background-color: ${cellColor};
  `;
  
  if (hasPlayer && value === 1) {
    return (
      <CellDiv>
        <img src={downdog} alt='game lost dog' style={{width: width, height: height}} />
      </CellDiv>
    )
  }

  if (hasPlayer) {
    return (
      <CellDiv>
        <img src={dog} alt='player gif' style={{width: width, height: height}} />
      </CellDiv>
    );
  }

  return (
    <CellDiv />
  );
};

function mapStateToProps(state, ownProps) {
  return {
    value: state.board[ownProps.y][ownProps.x]
  }
}

export default connect(mapStateToProps,null)(Cell);