import React, {Fragment} from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

const RunOptions = ({ startSimulation, endSimulation }) => (
  <ButtonToolbar>
    <Button size='sm' onClick={startSimulation} 
      style={{backgroundColor: 'rgb(124, 181, 236)', border:'none', marginRight: '10px'}}>
        start simulation
    </Button>
    <Button size='sm' onClick={endSimulation} 
      style={{backgroundColor: 'rgb(124, 181, 236)', border:'none'}}>
        end simulation
    </Button>
  </ButtonToolbar>
);

export default RunOptions;