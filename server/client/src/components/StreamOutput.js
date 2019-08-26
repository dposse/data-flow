import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StreamOutput = ({ board, lastMove }) => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const newInfo = info.concat([{ 
      nextRow: board[1], 
      move: lastMove, 
      tick: (info.length > 0) ? info[info.length-1].tick+1 : 0 }])
    if (newInfo.length > 10) {
      newInfo.shift();
    }
    setInfo(newInfo);
  }, [board, lastMove]);

  return (
    <StyledContainer>
      {info.map((row) => {
        return (
          <OutputRow><span style={{float: 'left', width: '40px'}}>{row.tick}: </span>Next row: {row.nextRow}, Move: {row.move}</OutputRow>
        );
      })}
    </StyledContainer>
  )
};

const StyledContainer = styled.div`
  color: white;
  border: 1px white solid;
  border-radius: .2rem;
  margin-top: 20px;
  padding: 5px;
  height: 200px;
  width: 350px;
`;

const OutputRow = styled.p`
  margin: 0;
  padding: 0;
  padding-left: 5px;
  font-size: .8em;
`;

function mapStateToProps(state) {
  return {
    board: state.board,
    lastMove: state.lastMove
  }
}

export default connect(mapStateToProps, null)(StreamOutput);