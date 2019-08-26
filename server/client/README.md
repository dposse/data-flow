NOTES ON ML MODELS
1st model
  - trained on first iteration of game where every other row had tiles. the rows could be impossible, i.e. [1,1,1,1,1]
  - whole board passed in as input tensor to model - 5x5 = 25 nodes + 1 for player position
  - only learned to stay at the left wall and stay alive through [1,0,...] rows
  - i think 128 nodes in hidden layer?
  - 1 node output, if 0 go left, if 1 go right
  - learning rate 0.05
2nd model
  - game same as above, but model only given the next row and player position as input instead of the whole board
  - still had impossible [1,1,1,1,1] rows
  - 512 nodes
  - learning rate 0.05 and 0.03
3rd model
  - currently training
  - rows cannot be impossible, must have at least one 0 i.e. [1,0,1,1,1]
    - although not checking if it is possible for a player to have enough moves to survive
  - 256 nodes in hidden layer
  - learning rate 0.03


saturday night notes:
- [X] style existing buttons
- [X] add buttons to switch between random bot and ml bot
  - [X] backend
- [ ] slow/medium/fast simulation option (or enter ms)
- [X] remove tensorflow stuff from cartpole, add own styling
- [ ] train with 3 node output layer to simulate left/right/none
  - [ ] move to 5 node output layer for 2 left/1 left/none/1 right/2 right


Thursday night plan:
- [X] buttons on front end start/stop simulation loop
  - [X] continuous until stop button pressed
  - [X] number of games
  - [X] game steps - line graph?
    - [X] total
    - [X] this game
    - [X] highest
    - [X] average
  - [X] tiles
    - [X] total
    - [X] empty
    - [X] deadly
    - [X] percentages
  - [X] actions
    - [X] input left
    - [X] input right
    - [ ] (maybe input none)
    - [X] percentages
  - [X] movement
    - [X] amount left
    - [X] amount right
    - [X] percentages

[steps, movement right, tiles seen, movement left]

const playerStatistics = {
  randomBot: {
    steps: 0,
    tilesSeen: 0,
    movement: {
      leftDistance: 0,
      rightDistance: 0
    }
  },
  mlBot1: {
    steps: 0,
    tilesSeen: 0,
    movement: {
      leftDistance: 0,
      rightDistance: 0
    }
  },
  mlBot2: {
    steps: 0,
    tilesSeen: 0,
    movement: {
      leftDistance: 0,
      rightDistance: 0
    }
  }
};

currentGameStatistics = {
    gameSteps: 0, LINE CHART
    tiles: {
      total: 0, TABLE
      open: 0,
      closed: 0,
      percentOpen: 0,
      percentClosed: 0
    },
    actions: {
      total: 0, 
      numberOfLeftInputs: 0,
      numberOfRightInputs: 0,
      // if an ml model can choose no movement, add here
      percentLeftInput: 0,
      percentRightInput: 0
    },
    movement: {
      total: 0,
      leftDistance: 0,
      rightDistance: 0,
      percentLeftMovement: 0,
      percentRightMovement: 0
    }
  };


Frontend plan

- [ ] make game grid
  - [ ] each cell is a component
    - [X] has key that corresponds to x,y coordinate
    - [ ] either empty, tile, or player
- [ ] redux
  - [ ] actions
    - [ ] update environment based on data from server
    - [ ] move left/right
    - [ ] jump
  - [ ] reducers
    - [ ] update environment
    - [ ] move left/right
    - [ ] jump

- [ ] only redux emits socket messages







5x5
  25
  player position
  nextAction
  = 27 input layer
  get permutations of above

output layer
  no movement
  left
  right



notes wed 
 timebox training - until midnight tonight otherwise move on
 
 if can get training going
  move on to moving

export to webgl through iframe
  unity and ml agents
  bridge that can send messages through js to c#

