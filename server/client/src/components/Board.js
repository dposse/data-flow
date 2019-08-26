import React from 'react';
import { connect } from 'react-redux';
import Cell from './Cell';
import styled from 'styled-components';

const CELL_SIZE = 40;
const WIDTH = 400;
const HEIGHT = 400;


const Board = ({ board, playerPosition }) => {
  return (
    <BoardDiv>
      {/* {console.log(tempCellsArray)} */}
      {board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          if (rowIndex === 0 && playerPosition === colIndex) {
            return <Cell x={colIndex} y={rowIndex} key={`${colIndex},${rowIndex}`} hasPlayer={true} />
          } else {
            return <Cell x={colIndex} y={rowIndex} key={`${colIndex},${rowIndex}`} hasPlayer={false} />
          }
        });
      })}
    </BoardDiv>
  )
};

const BoardDiv = styled.div`
  width: ${WIDTH};
  height: ${HEIGHT};
  backgroundSize: ${CELL_SIZE}px ${CELL_SIZE}px;
  position: relative;
  margin: 0 auto;
`;

function mapStateToProps(state) {
  return {
    board: state.board,
    playerPosition: state.player.position
  }
}

export default connect(mapStateToProps, null)(Board);