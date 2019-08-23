Thursday night plan:
- [X] buttons on front end start/stop simulation loop
  - [X] continuous until stop button pressed
- [ ] sends stats in its own loop - match ticks?
  - [ ] number of games
  - [ ] game ticks - line graph?
    - [ ] total
    - [ ] this game
    - [ ] highest
    - [ ] average
  - [ ] tiles
    - [ ] total
    - [ ] empty
    - [ ] deadly
    - [ ] percentages



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

