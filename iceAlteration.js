const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const objects = require('./objects');
const player = objects.player;

const slide = (matrix, x, y) => {
  if (matrix[x][y].direction === 'up' && matrix[x - 1][y].type === 'floor') {
    matrix[x - 1][y] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'up' };
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };
    return `${x - 1}${y}`;
  } else if (matrix[x][y].direction === 'up' && matrix[x - 1][y].type === 'enemy') {
    matrix[x - 1][y].isSliding = 'true';
    pushEnemyUp(matrix, x, y);
    return `${x - 1}${y}`;
  } else if (matrix[x][y].direction === 'down' && matrix[x + 1][y].type === 'floor') {
    matrix[x + 1][y] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'down' };
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };
    return `${x + 1}${y}`;
  } else if (matrix[x][y].direction === 'down' && matrix[x + 1][y].type === 'enemy') {
    matrix[x + 1][y].isSliding = 'true';
    pushEnemyDown(matrix, x, y);
    return `${x + 1}${y}`;
  } else if (matrix[x][y].direction === 'left' && matrix[x][y - 1].type === 'floor') {
    matrix[x][y - 1] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'left' };
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };
    return `${x}${y - 1}`;
  } else if (matrix[x][y].direction === 'left' && matrix[x][y - 1].type === 'enemy') {
    matrix[x][y - 1].isSliding = 'true';
    pushEnemyLeft(matrix, x, y);
    return `${x}${y - 1}`;
  } else if (matrix[x][y].direction === 'right' && matrix[x][y + 1].type === 'enemy') {
    matrix[x][y + 1].isSliding = 'true';

    pushEnemyRight(matrix, x, y);
    return `${x}${y + 1}`;
  } else if (matrix[x][y].direction === 'right' && matrix[x][y + 1].type === 'floor') {
    matrix[x][y + 1] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'right' };
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };
    return `${x}${y + 1}`;
    // =========================================================================================================================================== megállási feltételek:
  } else if (matrix[x][y].direction === 'up' && (matrix[x - 1][y].type === 'wall' || matrix[x - 1][y].type === 'ice')) {
    matrix[x][y] = { type: 'ice', symbol: objects.ice.symbol };
    return `${x}${y}`;
  } else if (matrix[x][y].direction === 'down' && (matrix[x + 1][y].type === 'wall' || matrix[x + 1][y].type === 'ice')) {
    matrix[x][y] = { type: 'ice', symbol: objects.ice.symbol };
    return `${x}${y}`;
  } else if (matrix[x][y].direction === 'left' && (matrix[x][y - 1].type === 'wall' || matrix[x][y - 1].type === 'ice')) {
    matrix[x][y] = { type: 'ice', symbol: objects.ice.symbol };
    return `${x}${y}`;
  } else if (matrix[x][y].direction === 'right' && (matrix[x][y + 1].type === 'wall' || matrix[x][y + 1].type === 'ice')) {
    matrix[x][y] = { type: 'ice', symbol: objects.ice.symbol };
    return `${x}${y}`;
  }
};

const pushEnemyUp = (matrix, x, y) => {
  if (matrix[x][y].direction === 'up' && matrix[x - 1][y].type === 'enemy') {
    if (!isBetweenBlocksUp(matrix, x - 1, y)) {
      matrix[x - 2][y] = { type: 'enemy', symbol: objects.enemy.symbol, isSliding: true };
    }
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };
    matrix[x - 1][y] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'up' };
  }
};
const pushEnemyDown = (matrix, x, y) => {
  if (matrix[x][y].direction === 'down' && matrix[x + 1][y].type === 'enemy') {
    if (!isBetweenBlocksDown(matrix, x + 1, y)) {
      matrix[x + 2][y] = { type: 'enemy', symbol: objects.enemy.symbol, isSliding: true };
    }
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };
    matrix[x + 1][y] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'down' };
  }
};

const pushEnemyLeft = (matrix, x, y) => {
  if (matrix[x][y].direction === 'left' && matrix[x][y - 1].type === 'enemy') {
    if (!isBetweenBlocksLeft(matrix, x, y - 1)) {
      matrix[x][y - 2] = { type: 'enemy', symbol: objects.enemy.symbol, isSliding: true };
    }
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };
    matrix[x][y - 1] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'left' };
  }
};

const pushEnemyRight = (matrix, x, y) => {
  if (matrix[x][y].direction === 'right' && matrix[x][y + 1].type === 'enemy') {
    if (!isBetweenBlocksRight(matrix, x, y + 1)) {
      matrix[x][y + 2] = { type: 'enemy', symbol: objects.enemy.symbol, isSliding: true };
    }
    matrix[x][y] = { type: 'floor', symbol: objects.floor.symbol };
    matrix[x][y + 1] = { type: 'slidingBlock', symbol: objects.slidingBlock.symbol, direction: 'right' };
  }
};

const isBetweenBlocksUp = (matrix, x, y) => {
  if (matrix[x][y].type === 'enemy' && ((matrix[x - 1][y].type === 'wall') || matrix[x - 1][y].type === 'ice')) {
    console.log('nyekk');
    return true;
  } else return false;
};

const isBetweenBlocksDown = (matrix, x, y) => {
  if (matrix[x][y].type === 'enemy' && ((matrix[x + 1][y].type === 'wall') || matrix[x + 1][y].type === 'ice')) {
    console.log('nyekk');
    return true;
  } else return false;
};

const isBetweenBlocksLeft = (matrix, x, y) => {
  if (matrix[x][y].type === 'enemy' && ((matrix[x][y - 1].type === 'wall') || matrix[x][y - 1].type === 'ice')) {
    console.log('nyekk');
    return true;
  } else return false;
};
const isBetweenBlocksRight = (matrix, x, y) => {
  if (matrix[x][y].type === 'enemy' && ((matrix[x][y + 1].type === 'wall') || matrix[x][y + 1].type === 'ice')) {
    console.log('nyekk');
    return true;
  } else return false;
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

module.exports = { slide, pushIce, destroyIce, player };
