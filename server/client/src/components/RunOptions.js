import React, {Fragment} from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

const RunOptions = ({ startSimulation, endSimulation }) => (
  <ButtonToolbar>
    <Button size='sm' onClick={startSimulation}>start simulation</Button>
    <Button size='sm' onClick={endSimulation}>end simulation</Button>
  </ButtonToolbar>
);

export default RunOptions;