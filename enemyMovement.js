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


const oppositeDirs = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left'
};

const stepTo = {
  up: (xCoord, yCoord, matrix) => {
    xCoord--;
    matrix[xCoord][yCoord] = matrix[xCoord + 1][yCoord];
    matrix[xCoord + 1][yCoord] = objects.floor;
  },
  down: (xCoord, yCoord, matrix) => {
    xCoord++;
    matrix[xCoord][yCoord] = matrix[xCoord - 1][yCoord];
    matrix[xCoord - 1][yCoord] = objects.floor;
  },
  left: (xCoord, yCoord, matrix) => {
    yCoord--;
    matrix[xCoord][yCoord] = matrix[xCoord][yCoord + 1];
    matrix[xCoord][yCoord + 1] = objects.floor;
  },
  right: (xCoord, yCoord, matrix) => {
    yCoord++;
    matrix[xCoord][yCoord] = matrix[xCoord][yCoord - 1];
    matrix[xCoord][yCoord - 1] = objects.floor;
  }
};

const directions = [];
const getDirections = (xCoord, yCoord, matrix) => {  // getDirections (x, y, arr)
  if (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player') {
    directions.push('up');
  }
  if (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player') {
    directions.push('down');
  }
  if (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player') {
    directions.push('left');
  }
  if (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player') {
    directions.push('right');
  }
  return directions;
};

const vmi = (xCoord, yCoord, matrix) => {
  const directions = getDirections(xCoord, yCoord, matrix);
  const dir = matrix[xCoord][yCoord].direction;
  console.log('directions:', directions);
  console.log('dir:', dir);

  // const arr = [up down left]; függvény az irányok kiszámítására
  for (let i = 0; i < directions.length; i++) {
    if (directions.includes(dir)) {
      directions.splice(directions.indexOf(dir), 1);
      console.log(directions);
    }
    console.log('oppositedir:', oppositeDirs[dir]);
    if (directions.includes(oppositeDirs[dir])) {
      directions.splice(directions.indexOf(oppositeDirs[dir], 1));
      console.log(directions);
    }
  }
};

const moveEnemy = (xCoord, yCoord, matrix) => {
  if (directions.length === 0) { // 1 lépést előre
    console.log('hello2');
    stepTo.up(xCoord, yCoord, matrix);
  } else {
    console.log('Hello');
    const randomIndex = Math.floor(Math.random() * directions.length); // lehet kell neki +1?
    const newDir = directions[randomIndex];
    stepTo.newDir(xCoord, yCoord, matrix);
    // Random irány 
    // const randomIndex = Math.random()*directions.length;
    // const newDir = arr[randomIndex]
    // stepTo(newDir)
  }
  return `${xCoord}${yCoord}`;
};
// console.log(oppositeDirs[dir]);



/* if (matrix[xCoord][yCoord].direction === ) */  // ha az utolsó direction irányába tud még lépni, akkora arra lépjen még egyet

// v1
const moveEnemy2 = (xCoord, yCoord, matrix) => {
  if (matrix[xCoord][yCoord].direction === 'up' && (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player')) {
    xCoord--;
    matrix[xCoord][yCoord] = matrix[xCoord + 1][yCoord];
    matrix[xCoord + 1][yCoord] = objects.floor;
    return `${xCoord}${yCoord}`;
  } else if (matrix[xCoord][yCoord].direction === 'down' && (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player')) {
    xCoord++;
    matrix[xCoord][yCoord] = matrix[xCoord - 1][yCoord];
    matrix[xCoord - 1][yCoord] = objects.floor;
    return `${xCoord}${yCoord}`;
  } else if (matrix[xCoord][yCoord].direction === 'left' && (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player')) {
    yCoord--;
    matrix[xCoord][yCoord] = matrix[xCoord][yCoord + 1];
    matrix[xCoord][yCoord + 1] = objects.floor;
    return `${xCoord}${yCoord}`;
  } else if (matrix[xCoord][yCoord].direction === 'right' && (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player')) {
    yCoord++;
    matrix[xCoord][yCoord] = matrix[xCoord][yCoord - 1];
    matrix[xCoord][yCoord - 1] = objects.floor;
    return `${xCoord}${yCoord}`;
  }

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

// v2
/*
const stepEnemyUp = (xCoord, yCoord, matrix) => {
  xCoord--;
  matrix[xCoord][yCoord] = matrix[xCoord + 1][yCoord];
  matrix[xCoord + 1][yCoord] = objects.floor;
};
const stepEnemyDown = (xCoord, yCoord, matrix) => {
  xCoord++;
  matrix[xCoord][yCoord] = matrix[xCoord - 1][yCoord];
  matrix[xCoord - 1][yCoord] = objects.floor;
};
const stepEnemyLeft = (xCoord, yCoord, matrix) => {
  yCoord--;
  matrix[xCoord][yCoord] = matrix[xCoord][yCoord + 1];
  matrix[xCoord][yCoord + 1] = objects.floor;
};
const stepEnemyRight = (xCoord, yCoord, matrix) => {
  yCoord++;
  matrix[xCoord][yCoord] = matrix[xCoord][yCoord - 1];
  matrix[xCoord][yCoord - 1] = objects.floor;
};

const moveEnemy = (xCoord, yCoord, matrix) => {
  if (matrix[xCoord][yCoord].direction === 'up' && (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player')) {
    stepEnemyUp(xCoord, yCoord, matrix);
    return `${xCoord}${yCoord}`;
  } else if (matrix[xCoord][yCoord].direction === 'down' && (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player')) {
    stepEnemyDown(xCoord, yCoord, matrix);
    return `${xCoord}${yCoord}`;
  } else if (matrix[xCoord][yCoord].direction === 'left' && (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player')) {
    stepEnemyLeft(xCoord, yCoord, matrix);
    return `${xCoord}${yCoord}`;
  } else if (matrix[xCoord][yCoord].direction === 'right' && (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player')) {
    stepEnemyRight(xCoord, yCoord, matrix);
    return `${xCoord}${yCoord}`;
  }

  let isValid = false;
  while (!isValid) {
    const dir = randomMove();
    if (dir === 0 && xCoord > 0 && (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player')) { // up
      stepEnemyUp(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'up';
      return `${xCoord}${yCoord}`;
    } else if (dir === 1 && xCoord < matrix.length - 1 && (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player')) { // down
      stepEnemyDown(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'down';
      return `${xCoord}${yCoord}`;
    } else if (dir === 2 && yCoord > 0 && (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player')) { // left
      stepEnemyLeft(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'left';
      return `${xCoord}${yCoord}`;
    } else if (dir === 3 && yCoord < matrix[0].length - 1 && (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player')) { // right
      stepEnemyRight(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'right';
      return `${xCoord}${yCoord}`;
    } else {
      isValid = true;
    }
  }
};
*/

// v3
/*
const stepEnemy = {
  up: (xCoord, yCoord, matrix) => {
    xCoord--;
    matrix[xCoord][yCoord] = matrix[xCoord + 1][yCoord];
    matrix[xCoord + 1][yCoord] = objects.floor;
  },
  down: (xCoord, yCoord, matrix) => {
    xCoord++;
    matrix[xCoord][yCoord] = matrix[xCoord - 1][yCoord];
    matrix[xCoord - 1][yCoord] = objects.floor;
  },
  left: (xCoord, yCoord, matrix) => {
    yCoord--;
    matrix[xCoord][yCoord] = matrix[xCoord][yCoord + 1];
    matrix[xCoord][yCoord + 1] = objects.floor;
  },
  right: (xCoord, yCoord, matrix) => {
    yCoord++;
    matrix[xCoord][yCoord] = matrix[xCoord][yCoord - 1];
    matrix[xCoord][yCoord - 1] = objects.floor;
  }
};

const moveEnemy = (xCoord, yCoord, matrix) => {
  if (matrix[xCoord][yCoord].direction === 'up' && (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player')) {
    stepEnemy.up(xCoord, yCoord, matrix);
    return `${xCoord}${yCoord}`;
  } else if (matrix[xCoord][yCoord].direction === 'down' && (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player')) {
    stepEnemy.down(xCoord, yCoord, matrix);
    return `${xCoord}${yCoord}`;
  } else if (matrix[xCoord][yCoord].direction === 'left' && (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player')) {
    stepEnemy.left(xCoord, yCoord, matrix);
    return `${xCoord}${yCoord}`;
  } else if (matrix[xCoord][yCoord].direction === 'right' && (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player')) {
    stepEnemy.right(xCoord, yCoord, matrix);
    return `${xCoord}${yCoord}`;
  }

  let isValid = false;
  while (!isValid) {
    const dir = randomMove();
    if (dir === 0 && xCoord > 0 && (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player')) { // up
      stepEnemy.up(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'up';
      return `${xCoord}${yCoord}`;
    } else if (dir === 1 && xCoord < matrix.length - 1 && (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player')) { // down
      stepEnemy.down(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'down';
      return `${xCoord}${yCoord}`;
    } else if (dir === 2 && yCoord > 0 && (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player')) { // left
      stepEnemy.left(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'left';
      return `${xCoord}${yCoord}`;
    } else if (dir === 3 && yCoord < matrix[0].length - 1 && (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player')) { // right
      stepEnemy.right(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'right';
      return `${xCoord}${yCoord}`;
    } else {
      isValid = true;
    }
  }
};
*/

// collision (implement in moveEnemy pls.):

const collision = (obj1, obj2) => {
  if (obj1.type === 'slidingBlock' && obj2.type === 'enemy') {
    obj2 = { type: 'blood', symbol: objects.blood.symbol };
  }
};

module.exports = { moveEnemy, vmi };
