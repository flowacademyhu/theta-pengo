const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const matrixF = require('./matrixFunctions');
const objects = require('./objects');
const fs = require('fs');
const dataFromFile = fs.readFileSync('map_prototype.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  return data;
});

const player = objects.player;
const turnPlayer = (player, direction) => {
  player.direction = direction;
};


const movePlayer = (player, direction, matrix) => {
  if (direction === 'up' && matrix[player.xCoord - 1][player.yCoord].type !== 'ice' &&
    matrix[player.xCoord - 1][player.yCoord].type !== 'wall') {

    player.xCoord--;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord + 1][player.yCoord] = { type: 'floor', symbol: objects.floor.symbol };

  } else if (direction === 'down' && matrix[player.xCoord + 1][player.yCoord].type !== 'ice' &&
    matrix[player.xCoord + 1][player.yCoord].type !== 'wall') {

    player.xCoord++;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord - 1][player.yCoord] = { type: 'floor', symbol: objects.floor.symbol };

  } else if (direction === 'left' && matrix[player.xCoord][player.yCoord - 1].type !== 'ice' &&
    matrix[player.xCoord][player.yCoord - 1].type !== 'wall') {

    player.yCoord--;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord][player.yCoord + 1] = { type: 'floor', symbol: objects.floor.symbol };

  } else if (direction === 'right' && matrix[player.xCoord][player.yCoord + 1].type !== 'ice' &&
    matrix[player.xCoord][player.yCoord + 1].type !== 'wall') {


    player.yCoord++;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord][player.yCoord - 1] = { type: 'floor', symbol: objects.floor.symbol };

  }

};


const keyProcessor = () => {
  stdin.on('data', (key) => {
    if (key === 'w') {
      turnPlayer(player, 'up');
      movePlayer(player, 'up', matrix);
    }
    if (key === 's') {
      turnPlayer(player, 'down');
      movePlayer(player, 'down', matrix);
    }
    if (key === 'a') {
      turnPlayer(player, 'left');
      movePlayer(player, 'left', matrix);
    }
    if (key === 'd') {
      turnPlayer(player, 'right');
      movePlayer(player, 'right', matrix);
    }
    if (key === 'k') {
      pushIce(player, matrix);
    }
    if (key === 'l') {
      destroyIce(player, matrix);
    }
    if (key === 'q') {
      process.exit(0);
    }
  }
  );
};
/*const slide = (matrix, x, y) => {
  if (matrix[x][y].direction === 'up' && matrix[x - 1][y].type === 'floor') {

    matrix[x + 1][y] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'up' };
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };

  } else if (player.direction === 'down' && matrix[player.xCoord + 1][player.yCoord].type === 'ice') {

    matrix[player.xCoord + 1][player.yCoord] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'down' };

  } else if (player.direction === 'left' && matrix[player.xCoord][player.yCoord - 1].type === 'ice') {

    matrix[player.xCoord][player.yCoord - 1] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'left' };

  } else if (player.direction === 'right' && matrix[player.xCoord][player.yCoord + 1].type === 'ice') {

  }
};*/
  const pushIce = (player, matrix) => {
    if (player.direction === 'up' && matrix[player.xCoord - 1][player.yCoord].type === 'ice') {

      matrix[player.xCoord - 1][player.yCoord] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'up' };

    } else if (player.direction === 'down' && matrix[player.xCoord + 1][player.yCoord].type === 'ice') {

      matrix[player.xCoord + 1][player.yCoord] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'down' };

    } else if (player.direction === 'left' && matrix[player.xCoord][player.yCoord - 1].type === 'ice') {

      matrix[player.xCoord][player.yCoord - 1] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'left' };

    } else if (player.direction === 'right' && matrix[player.xCoord][player.yCoord + 1].type === 'ice') {

      matrix[player.xCoord][player.yCoord + 1] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'right' };

    }
  };
  const destroyIce = (player, matrix) => {
    if (player.direction === 'up' && matrix[player.xCoord - 1][player.yCoord].type === 'ice') {

      matrix[player.xCoord - 1][player.yCoord] = { type: 'floor', symbol: objects.floor.symbol };

    } else if (player.direction === 'down' && matrix[player.xCoord + 1][player.yCoord].type === 'ice') {

      matrix[player.xCoord + 1][player.yCoord] = { type: 'floor', symbol: objects.floor.symbol };

    } else if (player.direction === 'left' && matrix[player.xCoord][player.yCoord - 1].type === 'ice') {

      matrix[player.xCoord][player.yCoord - 1] = { type: 'floor', symbol: objects.floor.symbol };

    } else if (player.direction === 'right' && matrix[player.xCoord][player.yCoord + 1].type === 'ice') {

      matrix[player.xCoord][player.yCoord + 1] = { type: 'floor', symbol: objects.floor.symbol };

    }
  };


  const matrix = matrixF.generateMatrix(17, 15);

  const init = () => {
    matrixF.fillMatrixFromFile(matrix, dataFromFile, objects.player);
    matrixF.printMatrix(matrix);
  };

  const loop = () => {
    setInterval(() => {
      console.clear();
      //slide(matrix, 2, 4);
      matrixF.printMatrix(matrix);
    }, 1000);
  };

  init();
  loop();
  keyProcessor();
