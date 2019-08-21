const tf = require('@tensorflow/tfjs-node');
const { WALL_SIZE } = require('../gameConstants');

class MLPlayer {
  initialize() {
    //setup model, load
    console.log(`hey i got here and wall size is ${WALL_SIZE}`);
  }

  //receive state from game loop, submit next move
  updateGameState() {
    //in ML model make prediction here
  }

  //game asks for players move every tick
  getMove() {
    return this.nextAction;
  }

  stop() {
    console.log(`called player.stop`);
  }

  //helpers
  _createModel() {
    const model = tf.sequential();

    //hidden layers
    //inputs are 

    //output layer
  }
}

module.exports = MLPlayer;