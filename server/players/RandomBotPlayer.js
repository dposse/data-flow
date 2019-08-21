class RandomBotPlayer {
  initialize() {
    //setup model, load
    // this.botLoop = setInterval(() => {
    //   this.randomMove();
    // }, 1000);
    this.nextAction = 'none';
  }

  //receive state from game loop, submit next move
  updateGameState() {
    //in ML model make prediction here
    this.makeRandomMove();
  }

  makeRandomMove() {
    const rand = Math.random();
    if (rand < .33) {
      this.nextAction = 'left';
    } else if (rand < .66) {
      this.nextAction = 'right';
    } else {
      this.nextAction = 'none';
    }
  }

  //game asks for players move every tick
  getMove() {
    return this.nextAction;
  }

  stop() {
    console.log(`called player.stop`);
    // clearInterval(this.botLoop);
  }
}

module.exports = RandomBotPlayer;