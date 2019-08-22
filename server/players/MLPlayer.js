const tf = require('@tensorflow/tfjs-node');
const { WALL_SIZE } = require('../gameConstants');

class MLPlayer {
  async initialize() {
    //load model from files
    this.model = await tf.loadLayersModel('file://players/mladventures-v0.json');
    console.log(`loaded model: `, this.model);
    this.nextAction = 'none';
  }

  //receive state from game loop, submit next move
  updateGameState() {
    //in ML model make prediction here - probably needs await
    // set to this.nextAction for consistency

  }

  //game asks for players move every tick
  getMove() {
    return this.nextAction;
  }

  stop() {
    console.log(`called player.stop`);
  }
}

module.exports = MLPlayer;