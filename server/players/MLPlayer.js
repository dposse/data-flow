const tf = require('@tensorflow/tfjs-node');

/**
 * This model was trained with a 5x5 board and player position passed in as an input tensor.
 * The board in the training simiulation is 2d array, but it is flattened into a 1d array
 *  with player position as the last item in the array, i.e. [0,0,0,...,2]
 * 
 * Apparently has only learned to always go left, except to avoid a single block i.e. [1,0,0,0,0] it will survive.
 * Usually won't even try to avoid [1,1,0,0,0]
 */

class MLPlayer {
  async initialize() {
    return new Promise(async (resolve, reject) => {
      //load model from files
      this.model = await tf.loadLayersModel(
        (process.env.NODE_ENV === 'production') 
          ? 'file://server/tensorflow_models/mladventures-v0.json'
          : 'file://tensorflow_models/mladventures-v0.json'
      );
      console.log(`loaded model: `, this.model);
      this.nextAction = 'none';
      this.modelName = 'mlBot1';
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

      //board is 10x10 - get 5x5 to pass in tensor array
      const tensorArray = [].concat.apply([],this._createMiniBoard(currentBoard, currentPlayerPosition));

      // console.log(tensorArray);
      tensorArray.push(currentPlayerPosition);
      // console.log(tensorArray);
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
      if (leftProb.dataSync()[0] <= 0) {
        this.nextAction = 'left';
      } else {
        this.nextAction = 'right';
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

  _createMiniBoard(board, position) {
    //hacky way for now
    if (position < 3) {
      return board.filter((row, index) => {
        return index < 5;
      }).map(row => row.slice(0,5));
    } else if (position > 6) {
      return board.filter((row, index) => {
        return index < 5;
      }).map(row => row.slice(5));
    } else {
      return board.filter((row, index) => {
        return index < 5;
      }).map(row => row.slice(position-2, position+3));
    }
  }
}

module.exports = MLPlayer;