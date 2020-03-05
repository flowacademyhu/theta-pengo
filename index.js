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
      pushIce(player.direction, matrix);
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
const pushIce = (player, matrix) => {
  if (player.direction === 'up' && player.xCoord > 0 && matrix[player.xCoord - 1][player.yCoord].type === 'ice') {
    matrix[player.xCoord - 2][player.yCoord] = objects.floor;
  } else if (player.direction === 'down' && player.xCoord < matrix.length - 1 && matrix[player.xCoord + 1][player.yCoord].type === 'ice') {
    matrix[player.xCoord + 1][player.yCoord] = objects.floor;
  } else if (player.direction === 'left' && player.yCoord > 0 && matrix[player.xCoord][player.yCoord - 1].type === 'ice') {
    matrix[player.xCoord][player.yCoord - 1] = objects.floor;
  } else if (player.direction === 'right' && player.yCoord < matrix[0].length - 1 && matrix[player.xCoord][player.yCoord + 1].type === 'ice') {
    matrix[player.xCoord][player.yCoord + 1] = objects.floor;
  }
};
const destroyIce = (player, matrix) => {
  if (player.direction === 'up' && player.xCoord > 0 && matrix[player.xCoord - 1][player.yCoord].type === 'ice') {
    matrix[player.xCoord - 1][player.yCoord] = objects.floor;
  } else if (player.direction === 'down' && player.xCoord < matrix.length - 1 && matrix[player.xCoord + 1][player.yCoord].type === 'ice') {
    matrix[player.xCoord + 1][player.yCoord] = objects.floor;
  } else if (player.direction === 'left' && player.yCoord > 0 && matrix[player.xCoord][player.yCoord - 1].type === 'ice') {
    matrix[player.xCoord][player.yCoord - 1] = objects.floor;
  } else if (player.direction === 'right' && player.yCoord < matrix[0].length - 1 && matrix[player.xCoord][player.yCoord + 1].type === 'ice') {
    matrix[player.xCoord][player.yCoord + 1] = objects.floor;
  }
};
const placeEnemy = (matrix, enemy) => {
  matrix[enemy.xCoord][enemy.yCoord] = '@';
};

const matrix = matrixF.generateMatrix(17, 15);

const init = () => {
  matrixF.fillMatrixFromFile(matrix, dataFromFile, objects.player);
  matrixF.printMatrix(matrix);
};

const loop = () => {
  setInterval(() => {
    console.clear();
    matrixF.printMatrix(matrix);
  }, 1000);
};

init();
loop();
keyProcessor();
