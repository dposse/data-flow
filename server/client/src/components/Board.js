import React from 'react';
import Cell from './Cell';
import styled from 'styled-components';

const CELL_SIZE = 40;
const WIDTH = 400;
const HEIGHT = 400;
//using temp array to test frontend
//replace with redux store and mapStateToProps
const tempCellsArray = [];
for (let i=0; i<10; i++) {
  let innerArray = [];
  for (let j=0; j<10; j++) {
    innerArray.push(0);
  }
  tempCellsArray.push(innerArray);
}

const Board = () => {
  return (
    <BoardDiv>
      {console.log(tempCellsArray)}
      {tempCellsArray.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          return <Cell x={colIndex} y={rowIndex} key={`${colIndex},${rowIndex}`} />
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

export default Board;