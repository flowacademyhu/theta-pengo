const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
const chalk = require('chalk');

const objects = require('./objects');
const enemyMovement = require('./enemyMovement');
const player = objects.player;
const turnPlayer = (direction) => { // ( player, direction helyett csak direstion mivel ugyis csak azt adod meg a végén elvileg akkor az objectet is érteni fogja így)
  player.direction = direction;
};
const isPlayerDead = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j].type === 'player') {
        return false;
      }
    }
  }
  return true;
};
const findSafePlaceForPlayer = (matrix) => {
  const floors = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].type === 'floor' && !enemyMovement.isAround(matrix, i, j, 'enemy')) {
        floors.push([i, j]);
      }
    }
  }
  return floors;
};
const randomPlacePlayer = (matrix) => {
  const floors = findSafePlaceForPlayer(matrix);
  const randomIndex = Math.floor(Math.random() * floors.length);
  const randomFloor = floors[randomIndex];
  const x = randomFloor[0];
  const y = randomFloor[1];
  matrix[x][y] = objects.player;
  objects.player.x = x;
  objects.player.y = y;
};
const movePlayer = (player, direction, matrix) => {
  if (direction === 'up' && player.x > 0 && matrix[player.x - 1][player.y].type === 'floor') {
    player.x--;
    matrix[player.x][player.y] = player;
    matrix[player.x + 1][player.y] = objects.floor;
  } else if (direction === 'down' && player.x < matrix.length - 1 && matrix[player.x + 1][player.y].type === 'floor') {
    player.x++;
    matrix[player.x][player.y] = player;
    matrix[player.x - 1][player.y] = objects.floor;
  } else if (direction === 'left' && player.y > 0 && matrix[player.x][player.y - 1].type === 'floor') {
    player.y--;
    matrix[player.x][player.y] = player;
    matrix[player.x][player.y + 1] = objects.floor;
  } else if (direction === 'right' && player.y < matrix[0].length - 1 && matrix[player.x][player.y + 1].type === 'floor') {
    player.y++;
    matrix[player.x][player.y] = player;
    matrix[player.x][player.y - 1] = objects.floor;
  }
};

module.exports = { turnPlayer, movePlayer, player, isPlayerDead, randomPlacePlayer };
