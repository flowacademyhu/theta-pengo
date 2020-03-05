const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const matrixFunctions = require('./matrixFunctions');
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
  if (direction === 'up' && player.xCoord > 0 && matrix[player.xCoord - 1][player.yCoord].type !== 'ice' &&
    matrix[player.xCoord - 1][player.yCoord].type !== 'wall') {
    player.xCoord--;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord + 1][player.yCoord] = objects.floor;
  } else if (direction === 'down' && player.xCoord < matrix.length - 1 && matrix[player.xCoord + 1][player.yCoord].type !== 'ice' &&
    matrix[player.xCoord + 1][player.yCoord].type !== 'wall') {
    player.xCoord++;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord - 1][player.yCoord] = objects.floor;
  } else if (direction === 'left' && player.yCoord > 0 && matrix[player.xCoord][player.yCoord - 1].type !== 'ice' &&
    matrix[player.xCoord][player.yCoord - 1].type !== 'wall') {
    player.yCoord--;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord][player.yCoord + 1] = objects.floor;
  } else if (direction === 'right' && player.yCoord < matrix[0].length - 1 && matrix[player.xCoord][player.yCoord + 1].type !== 'ice' &&
    matrix[player.xCoord + 1][player.yCoord].type !== 'wall') {
    player.yCoord++;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord][player.yCoord - 1] = objects.floor;
  }
};

const enemy = objects.enemy;
const turnEnemy = (enemy, direction) => {
  enemy.direction = direction;
};

const randomMove = () => {
  return Math.floor(Math.random() * 4);
};

const moveEnemy = (enemy, direction, matrix) => {
  if (randomMove() === 0 && enemy.xCoord > 0 && matrix[enemy.xCoord - 1][enemy.yCoord] !== '1') { // up
    enemy.xCoord--;
    matrix[enemy.xCoord + 1][enemy.yCoord] = ' ';
  } else if (randomMove() === 1 && enemy.xCoord < matrix.length - 1 && matrix[enemy.xCoord + 1][enemy.yCoord] !== '1') { // down
    enemy.xCoord++;
    matrix[enemy.xCoord - 1][enemy.yCoord] = ' ';
  } else if (randomMove() === 2 && enemy.yCoord > 0 && matrix[enemy.xCoord][enemy.yCoord - 1] !== '1') { // left
    enemy.yCoord--;
    matrix[enemy.xCoord][enemy.yCoord + 1] = ' ';
  } else if (randomMove() === 3 && enemy.yCoord < matrix[0].length - 1 && matrix[enemy.xCoord][enemy.yCoord + 1] !== '1') { // right
    enemy.yCoord++;
    matrix[enemy.xCoord][enemy.yCoord - 1] = ' ';
  }
};

const keyProcessor = () => {
  stdin.on('data', (key) => {
    if (key === 'w') {
      turnPlayer(player, 'up');
      movePlayer(player, matrix);
    }
    if (key === 's') {
      turnPlayer(player, 'down');
      movePlayer(player, matrix);
    }
    if (key === 'a') {
      turnPlayer(player, 'left');
      movePlayer(player, matrix);
    }
    if (key === 'd') {
      turnPlayer(player, 'right');
      movePlayer(player, matrix);
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


const slide = (matrix, x, y) => {
  if (matrix[x][y].direction === 'up' && matrix[x - 1][y].type === 'floor') {

    matrix[x - 1][y] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'up' };
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };

  } else if (matrix[x][y].direction === 'down' && matrix[x + 1][y].type === 'floor') {

    matrix[x + 1][y] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'down' };

    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };

  } else if (matrix[x][y].direction === 'left' && matrix[x][y - 1].type === 'floor') {

    matrix[x][y - 1] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'left' };
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };

  } else if (matrix[x][y].direction === 'right' && matrix[x][y + 1].type === 'floor') {
    matrix[x][y + 1] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'right' };
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };

  } else {
    matrix[x][y] = { type: 'ice', symbol: objects.ice.symbol };
  }
};
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

const matrix = matrixFunctions.generateMatrix(17, 15);


//STEP FUNCTION : 

/* const step = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
    if ( matrix[i][j].type === player) {
      
    }
    }
  }
} */


const collision = (obj1, obj2) => {
  if (obj1.type === 'slidingBlock' && obj2.type === 'enemy') {
    obj2 = { type: 'blood', symbol: objects.blood.symbol };
  }
}


const init = () => {
  console.clear();
  matrixFunctions.fillMatrixFromFile(matrix, dataFromFile, objects.player);
  matrixFunctions.printMatrix(matrix);
};

const loop = () => {
  setInterval(() => {
    console.clear();
    for (let i = 0; i < matrix.length; i++) { // ezt a részt majd a step fv-be rakjuk át
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j].type === 'slidingBlock' && matrix[i][j].direction === 'down' && matrix[i][j].didItSlide === false) {
          slide(matrix, i, j);
          matrix[i][j].didItSlide = true;
        }
        if (matrix[i][j].type === 'slidingBlock' && matrix[i][j].direction === 'right' && matrix[i][j].didItSlide === false) {
          slide(matrix, i, j);
          matrix[i][j].didItSlide = true;
        }
        matrix[i][j].didItSlide = false;
        if (matrix[i][j].type === 'slidingBlock' && matrix[i][j].direction !== 'down' && matrix[i][j].direction !== 'right') {
          slide(matrix, i, j);
        }
      }
    }
    matrixFunctions.printMatrix(matrix);
  }, 500);
};

init();
loop();
keyProcessor()
