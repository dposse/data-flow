import React from 'react';
import styled from 'styled-components';

const CELL_SIZE = 40;


const Cell = ({ x, y }) => {
  //set individual cell positions and size
  const left = CELL_SIZE * x + 1;
  const top = CELL_SIZE * y + 1;
  const width = CELL_SIZE - 1;
  const height = CELL_SIZE - 1;

  return (
    <CellDiv />
  )
};

const CellDiv = styled.div`
  left: ${left}px;
  top: ${top}px;
  width: ${width}px;
  height: ${height}px;
`;

export default Cell;