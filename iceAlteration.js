const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const objects = require('./objects');
const fs = require('fs');


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
