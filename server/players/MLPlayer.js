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
  updateGameState(currentBoard, currentPlayerPosition) {
    //in ML model make prediction here - probably needs await
    console.log(currentBoard);
    // set to this.nextAction for consistency
    // flatten board to one array and add player position
    const tensorArray = [].concat.apply([], currentBoard);
    // console.log(tensorArray);
    tensorArray.push(currentPlayerPosition);
    // console.log(tensorArray);
    // console.log('hi ', tensorArray);

    const logits = this.model.predict(tf.tensor2d([tensorArray]));
    const leftProb = tf.sigmoid(logits);
    const leftRightProbs = tf.concat([leftProb, tf.sub(1, leftProb)], 1);
    // const actions = tf.randomNormal([2, 2]);//tf.multinomial(leftRightProbs, 1, null, true);
    // console.log(`leftprob: `, leftProb);
    // console.log(`lrprob: `, leftRightProbs);
    console.log(logits.dataSync());
    console.log('left prob: ',leftProb.dataSync());
    console.log(`leftright: `, leftRightProbs.dataSync());
    if (leftProb.dataSync()[0] === 0) {
      this.nextAction = 'left';
    } else if (leftProb.dataSync()[0] === 1) {
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
  }
}

module.exports = MLPlayer;