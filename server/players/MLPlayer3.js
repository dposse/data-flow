const tf = require('@tensorflow/tfjs-node');

/**
 * This model was trained by passing in the next two rows of a board, size 10, and the player position at the end.
 * 128 nodes in hidden layer
 * 1 node output layer
 * .95 discount
 * .05 learning
 * 
  */

class MLPlayer3 {
  async initialize() {
    return new Promise(async (resolve, reject) => {
      //load model from files
      this.model = await tf.loadLayersModel('file://tensorflow_models/nexttworowssize10-onenodeoutput.json');
      console.log(`loaded model: `, this.model);
      this.nextAction = 'none';
      this.modelName = 'mlBot3';
      resolve();
    });
  }

  //receive state from game loop, submit next move
  updateGameState(currentBoard, currentPlayerPosition) {
    /**
     * if using mladventures-v0, create tensorArray for prediction like so:
     *  const tensorArray = [].concat.apply([], currentBoard);
     *  tensorArray.push(currentPlayerPosition);
     * if using mladventures-nextrowonly, create tensorArray for prediction like so:
     *  const tensorArray = [...currentBoard[1]];
     *  tensorArray.push(currentPlayerPosition);
     */
    tf.tidy(() => {
      //in ML model make prediction here - probably needs await
      console.log(currentBoard);
      // set to this.nextAction for consistency
      // flatten board to one array and add player position

      // const tensorArray = [].concat.apply([], currentBoard);

      //this model takes one row of size 10
      const tensorArray = [].concat.apply([], this._getNextTwoRows(currentBoard));

      console.log(tensorArray);
      tensorArray.push(currentPlayerPosition);
      console.log(tensorArray);
      // console.log('hi ', tensorArray);

      const logits = this.model.predict(tf.tensor2d([tensorArray]));
      const leftProb = tf.sigmoid(logits);
      // const leftRightProbs = tf.concat([leftProb, tf.sub(1, leftProb)], 1);
      // const actions = tf.randomNormal([2, 2]);//tf.multinomial(leftRightProbs, 1, null, true);
      // console.log(`leftprob: `, leftProb);
      // console.log(`lrprob: `, leftRightProbs);
      console.log(logits.dataSync());
      console.log('left prob: ',leftProb.dataSync());
      // console.log(`leftright: `, leftRightProbs.dataSync());
      if (logits.dataSync()[0] < 1) {
        this.nextAction = 'right';
      } else {
        this.nextAction = 'left';
      }
      // else {
      //   this.nextAction = 'none';
      // }

      // if (action > 0) {
      //   this.playerPosition = this.moveRight(this.playerPosition);
      // } else {
      //   this.playerPosition = this.moveLeft(this.playerPosition);
      // } 
    });    
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
  }

  _getNextTwoRows(board) {
    return board.slice(1,3);
  }
}

module.exports = MLPlayer3;