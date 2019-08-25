class RandomBotPlayer {
  initialize() {
    this.nextAction = 'none';
    this.modelName = 'randomBot';
    //setup model, load
    // this.botLoop = setInterval(() => {
    //   this.randomMove();
    // }, 1000);
    return new Promise((resolve, reject) => {
      resolve();
    });
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

  getName() {
    return this.modelName;
  }

  stop() {
    console.log(`called player.stop`);
    // clearInterval(this.botLoop);
  }
}

module.exports = RandomBotPlayer;