const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const objects = require('./objects');

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

module.exports = { turnPlayer, movePlayer, player, isPlayerDead };
