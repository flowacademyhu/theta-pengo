const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const matrixFunctions = require('./matrixFunctions');
const objects = require('./objects');

const matrix = matrixFunctions.generateMatrix(17, 15);

// const turnEnemy = (enemy, direction) => {
//   direction = direction;
// };

const randomMove = () => {
  return Math.floor(Math.random() * 4);
};

/* if (matrix[xCoord][yCoord].direction === ) */  // ha az utolsó direction irányába tud még lépni, akkora arra lépjen még egyet
const moveEnemy = (xCoord, yCoord, matrix) => {

  let isValid = false;
  while (!isValid) {
    const dir = randomMove();
    if (dir === 0 && xCoord > 0 && (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player')) { // up
      xCoord--;
      matrix[xCoord][yCoord] = matrix[xCoord + 1][yCoord];
      matrix[xCoord + 1][yCoord] = objects.floor;
      isValid = true;
      matrix[xCoord][yCoord].direction = 'up';
      return `${xCoord}${yCoord}`;
    } else if (dir === 1 && xCoord < matrix.length - 1 && (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player')) { // down
      xCoord++;
      matrix[xCoord][yCoord] = matrix[xCoord - 1][yCoord];
      matrix[xCoord - 1][yCoord] = objects.floor;
      isValid = true;
      matrix[xCoord][yCoord].direction = 'down';
      return `${xCoord}${yCoord}`;
    } else if (dir === 2 && yCoord > 0 && (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player')) { // left
      yCoord--;
      matrix[xCoord][yCoord] = matrix[xCoord][yCoord + 1];
      matrix[xCoord][yCoord + 1] = objects.floor;
      isValid = true;
      matrix[xCoord][yCoord].direction = 'left';
      return `${xCoord}${yCoord}`;
    } else if (dir === 3 && yCoord < matrix[0].length - 1 && (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player')) { // right
      yCoord++;
      matrix[xCoord][yCoord] = matrix[xCoord][yCoord - 1];
      matrix[xCoord][yCoord - 1] = objects.floor;
      isValid = true;
      matrix[xCoord][yCoord].direction = 'right';
      return `${xCoord}${yCoord}`;
    } else {
      isValid = true;
    }
  }
};

//collision (implement in moveEnemy pls.):


const collision = (obj1, obj2) => {
  if (obj1.type === 'slidingBlock' && obj2.type === 'enemy') {
    obj2 = { type: 'blood', symbol: objects.blood.symbol };
  }
};

module.exports = { moveEnemy };
