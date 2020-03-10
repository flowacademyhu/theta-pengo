const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// const matrixFunctions = require('./matrixFunctions');
const objects = require('./objects');

// const matrix = matrixFunctions.generateMatrix(17, 15);

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

const stepTo = { // OK
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

const getAvailableDirections = (xCoord, yCoord, matrix) => { // getAvailableDirections (x, y, arr) OK
  const availableDirections = [];
  if (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player') {
    availableDirections.push('up');
  }
  if (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player') {
    availableDirections.push('down');
  }
  if (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player') {
    availableDirections.push('left');
  }
  if (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player') {
    availableDirections.push('right');
  }
  return availableDirections;
};

const filterAvailableDirections = (xCoord, yCoord, matrix) => { // el kell különíteni, hogy merre mehet, és mi merre akarjuk, hogy menjen
  const availableDirections = getAvailableDirections(xCoord, yCoord, matrix);
  const currentDirection = matrix[xCoord][yCoord].direction;
  console.log(xCoord, yCoord);
  console.log('availableDirections1:', availableDirections);
  console.log('currentDirection:', currentDirection);

  // const arr = [up down left]; függvény az irányok kiszámítására
  // for (let i = 0; i < availableDirections.length; i++) {
  if (availableDirections.includes(currentDirection)) {
    availableDirections.splice(availableDirections.indexOf(currentDirection), 1);
    console.log(availableDirections);
  }
  console.log('oppositedir:', oppositeDirs[currentDirection]);
  if (availableDirections.includes(oppositeDirs[currentDirection])) {
    availableDirections.splice(availableDirections.indexOf(oppositeDirs[currentDirection], 1));
    console.log(availableDirections);
  }
  console.log('availableDirections2:', availableDirections);
  // }
  return availableDirections;
};

const moveEnemy = (xCoord, yCoord, matrix) => {
  const availableDirections = filterAvailableDirections(xCoord, yCoord, matrix);
  if (availableDirections.length === 0) { // 1 lépést előre --- így átmegy mindenen ki a pályáról
    console.log('hello2');
    const currentDirection = matrix[xCoord][yCoord].currentDirection;
    stepTo.up(xCoord, yCoord, matrix); // kell vizsgálni, hogy szabad-e lépni abba az irányba
  } else {
    console.log('Hello');
    console.log(availableDirections);
    const randomIndex = Math.floor(Math.random() * availableDirections.length); // lehet kell neki +1?
    const newDirection = availableDirections[randomIndex];
    stepTo[newDirection](xCoord, yCoord, matrix);
    console.log('random irányba lépett');
    // Random irány
    // const randomIndex = Math.random()*availableDirections.length;
    // const newDirection = arr[randomIndex]
    // stepTo(newDirection)
  }
  return `${xCoord}${yCoord}`;
};
// console.log(oppositeDirs[currentDirection]);



/* if (matrix[xCoord][yCoord].direction === ) */ // ha az utolsó direction irányába tud még lépni, akkora arra lépjen még egyet

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
    const currentDirection = randomMove();
    if (currentDirection === 0 && xCoord > 0 && (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player')) { // up
      xCoord--;
      matrix[xCoord][yCoord] = matrix[xCoord + 1][yCoord];
      matrix[xCoord + 1][yCoord] = objects.floor;
      isValid = true;
      matrix[xCoord][yCoord].direction = 'up';
      return `${xCoord}${yCoord}`;
    } else if (currentDirection === 1 && xCoord < matrix.length - 1 && (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player')) { // down
      xCoord++;
      matrix[xCoord][yCoord] = matrix[xCoord - 1][yCoord];
      matrix[xCoord - 1][yCoord] = objects.floor;
      isValid = true;
      matrix[xCoord][yCoord].direction = 'down';
      return `${xCoord}${yCoord}`;
    } else if (currentDirection === 2 && yCoord > 0 && (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player')) { // left
      yCoord--;
      matrix[xCoord][yCoord] = matrix[xCoord][yCoord + 1];
      matrix[xCoord][yCoord + 1] = objects.floor;
      isValid = true;
      matrix[xCoord][yCoord].direction = 'left';
      return `${xCoord}${yCoord}`;
    } else if (currentDirection === 3 && yCoord < matrix[0].length - 1 && (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player')) { // right
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
    const currentDirection = randomMove();
    if (currentDirection === 0 && xCoord > 0 && (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player')) { // up
      stepEnemyUp(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'up';
      return `${xCoord}${yCoord}`;
    } else if (currentDirection === 1 && xCoord < matrix.length - 1 && (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player')) { // down
      stepEnemyDown(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'down';
      return `${xCoord}${yCoord}`;
    } else if (currentDirection === 2 && yCoord > 0 && (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player')) { // left
      stepEnemyLeft(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'left';
      return `${xCoord}${yCoord}`;
    } else if (currentDirection === 3 && yCoord < matrix[0].length - 1 && (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player')) { // right
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
    const currentDirection = randomMove();
    if (currentDirection === 0 && xCoord > 0 && (matrix[xCoord - 1][yCoord].type === 'floor' || matrix[xCoord - 1][yCoord].type === 'player')) { // up
      stepEnemy.up(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'up';
      return `${xCoord}${yCoord}`;
    } else if (currentDirection === 1 && xCoord < matrix.length - 1 && (matrix[xCoord + 1][yCoord].type === 'floor' || matrix[xCoord + 1][yCoord].type === 'player')) { // down
      stepEnemy.down(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'down';
      return `${xCoord}${yCoord}`;
    } else if (currentDirection === 2 && yCoord > 0 && (matrix[xCoord][yCoord - 1].type === 'floor' || matrix[xCoord][yCoord - 1].type === 'player')) { // left
      stepEnemy.left(xCoord, yCoord, matrix);
      isValid = true;
      matrix[xCoord][yCoord].direction = 'left';
      return `${xCoord}${yCoord}`;
    } else if (currentDirection === 3 && yCoord < matrix[0].length - 1 && (matrix[xCoord][yCoord + 1].type === 'floor' || matrix[xCoord][yCoord + 1].type === 'player')) { // right
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

module.exports = { moveEnemy, filterAvailableDirections };
