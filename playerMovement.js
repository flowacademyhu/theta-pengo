const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const objects = require('./objects');
const fs = require('fs');

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


const movePlayer = (player, direction, matrix) => {

  if (direction === 'up' && player.xCoord > 0 && matrix[player.xCoord - 1][player.yCoord].type === 'floor') {
    player.xCoord--;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord + 1][player.yCoord] = objects.floor;
  } else if (direction === 'down' && player.xCoord < matrix.length - 1 && matrix[player.xCoord + 1][player.yCoord].type === 'floor') {
    player.xCoord++;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord - 1][player.yCoord] = objects.floor;
  } else if (direction === 'left' && player.yCoord > 0 && matrix[player.xCoord][player.yCoord - 1].type === 'floor') {
    player.yCoord--;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord][player.yCoord + 1] = objects.floor;
  } else if (direction === 'right' && player.yCoord < matrix[0].length - 1 && matrix[player.xCoord][player.yCoord + 1].type === 'floor') {
    player.yCoord++;
    matrix[player.xCoord][player.yCoord] = player;
    matrix[player.xCoord][player.yCoord - 1] = objects.floor;
  }
};

module.exports = { turnPlayer, movePlayer, player, isPlayerDead };
