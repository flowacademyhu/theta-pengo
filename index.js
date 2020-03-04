const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const matrixF = require('./matrixFunctions');
const obj = require('./objects');
const fs = require('fs');
const matrix = matrixF.generateMatrix(15, 13);
const dataFromFile = fs.readFileSync('map_prototype.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  return data;
});

const player = obj.player;
const turnPlayer = (player, direction) => {
  player.direction = direction;
};

const movePlayer = (player, direction, matrix) => {
  if (direction === 'up' && player.xCoord > 0 && matrix[player.xCoord - 1][player.yCoord] !== '1') {
    player.xCoord--;
    matrix[player.xCoord + 1][player.yCoord] = ' ';
  } else if (direction === 'down' && player.xCoord < matrix.length - 1 && matrix[player.xCoord + 1][player.yCoord] !== '1') {
    player.xCoord++;
    matrix[player.xCoord - 1][player.yCoord] = ' ';
  } else if (direction === 'left' && player.yCoord > 0 && matrix[player.xCoord][player.yCoord - 1] !== '1') {
    player.yCoord--;
    matrix[player.xCoord][player.yCoord + 1] = ' ';
  } else if (direction === 'right' && player.yCoord < matrix[0].length - 1 && matrix[player.xCoord][player.yCoord + 1] !== '1') {
    player.yCoord++;
    matrix[player.xCoord][player.yCoord - 1] = ' ';
  }
};

const enemy = obj.enemy;
const turnEnemy = (enemy, direction) => {
  enemy.direction = direction;
};
const moveEnemy = (enemy, direction, matrix) => {
  if (direction === 'up' && enemy.xCoord > 0 && matrix[enemy.xCoord - 1][enemy.yCoord] !== '1') {
    enemy.xCoord--;
    matrix[enemy.xCoord + 1][enemy.yCoord] = ' ';
  } else if (direction === 'down' && enemy.xCoord < matrix.length - 1 && matrix[enemy.xCoord + 1][enemy.yCoord] !== '1') {
    enemy.xCoord++;
    matrix[enemy.xCoord - 1][enemy.yCoord] = ' ';
  } else if (direction === 'left' && enemy.yCoord > 0 && matrix[enemy.xCoord][enemy.yCoord - 1] !== '1') {
    enemy.yCoord--;
    matrix[enemy.xCoord][enemy.yCoord + 1] = ' ';
  } else if (direction === 'right' && enemy.yCoord < matrix[0].length - 1 && matrix[enemy.xCoord][enemy.yCoord + 1] !== '1') {
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
      //  pushIce(player.direction, matrix);
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
const destroyIce = (player, matrix) => {
  if (player.direction === 'up' && player.xCoord > 0 && matrix[player.xCoord - 1][player.yCoord] === '1') {
    matrix[player.xCoord - 1][player.yCoord] = '0';
  } else if (player.direction === 'down' && player.xCoord < matrix.length - 1 && matrix[player.xCoord + 1][player.yCoord] === '1') {
    console.log(player.direction);
    matrix[player.xCoord - 1][player.yCoord] = '0';
  } else if (player.direction === 'left' && player.yCoord > 0 && matrix[player.xCoord][player.yCoord - 1] === '1') {
    matrix[player.xCoord][player.yCoord + 1] = '0';
  } else if (player.direction === 'right' && player.yCoord < matrix[0].length - 1 && matrix[player.xCoord][player.yCoord + 1] === '1') {
    matrix[player.xCoord][player.yCoord - 1] = '0';
  }
};
const placePlayer = (matrix, player) => {
  matrix[player.xCoord][player.yCoord] = 'P';
};
const placeEnemy = (matrix, enemy) => {
  matrix[enemy.xCoord][enemy.yCoord] = '@';
};

const init = () => {
  matrixF.fillMatrixFromFile(matrix, dataFromFile);
  placePlayer(matrix, player);
  placeEnemy(matrix, enemy);
  matrixF.printMatrix(matrix);
};

const loop = () => {
  setInterval(() => {
    console.clear();
    placePlayer(matrix, player);
    matrixF.printMatrix(matrix);
  }, 1000);
};

init();
loop();
keyProcessor();
