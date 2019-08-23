Thursday night plan:
- [X] buttons on front end start/stop simulation loop
  - [X] continuous until stop button pressed
- [ ] sends stats in its own loop - match ticks? - CURRENTLY sent in game loop
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
  - [ ] actions
    - [ ] input left
    - [ ] input right
    - [ ] (maybe input none)
    - [ ] percentages
  - [ ] movement
    - [ ] amount left
    - [ ] amount right
    - [ ] percentages


const statistics = {
  gamesPlayed: 0,
  gameSteps: {
    total: 0,
    currentGame: 0,
    highest: 0,
    average: 0,
    eachGame: []
  },
  tiles: {
    total: 0,
    open: 0,
    closed: 0,
    percentOpen: 0,
    percentClosed: 0
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

