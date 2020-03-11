const objects = require('./objects');

// const turnEnemy = (enemy, direction) => {
//   direction = direction;
// };

/* const randomMove = () => {
  return Math.floor(Math.random() * 4);
}; */

const oppositeDirs = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left'
};
const stepTo = (matrix, xCoord, yCoord, direction) => { // OK
  if (direction === 'up') {
    xCoord--;
    matrix[xCoord][yCoord] = matrix[xCoord + 1][yCoord];
    matrix[xCoord + 1][yCoord] = objects.floor;
  } else if (direction === 'down') {
    xCoord++;
    matrix[xCoord][yCoord] = matrix[xCoord - 1][yCoord];
    matrix[xCoord - 1][yCoord] = objects.floor;
  } else if (direction === 'left') {
    yCoord--;
    matrix[xCoord][yCoord] = matrix[xCoord][yCoord + 1];
    matrix[xCoord][yCoord + 1] = objects.floor;
  } else if (direction === 'right') {
    yCoord++;
    matrix[xCoord][yCoord] = matrix[xCoord][yCoord - 1];
    matrix[xCoord][yCoord - 1] = objects.floor;
  }
  return [xCoord, yCoord];
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
  // console.log(xCoord, yCoord);
  // console.log('availableDirections1:', availableDirections);
  const canGoFurther = availableDirections.includes(currentDirection);
  // const arr = [up down left]; függvény az irányok kiszámítására
  // for (let i = 0; i < availableDirections.length; i++) {
  if (availableDirections.includes(currentDirection)) {
    availableDirections.splice(availableDirections.indexOf(currentDirection), 1);
    // console.log('after splice:', availableDirections);
  }
  // console.log('oppositedir:', oppositeDirs[currentDirection]);
  if (availableDirections.includes(oppositeDirs[currentDirection])) {
    availableDirections.splice(availableDirections.indexOf(oppositeDirs[currentDirection]), 1);
    // console.log('splice után ez marad: ', availableDirections);
  }
  // console.log('availableDirections2:', availableDirections);
  // }
  return { availableDirections, canGoFurther };
};
let eggsRemaining = 3;
const countEnemies = (matrix) => {
  let enemyCount = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].type === 'enemy') {
        enemyCount++;
      }
    }
  }
  if (enemyCount < 3 && eggsRemaining > 0) {
    hatch(matrix);
  }
  return enemyCount;
};
const collectIceBlocks = (matrix) => {
  const iceBlocks = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].type === 'ice') {
        iceBlocks.push([i, j]);
      }
    }
  }
  return iceBlocks;
};
const hatch = (matrix) => {
  const iceBlocks = collectIceBlocks(matrix);
  const randomIndex = Math.floor(Math.random() * iceBlocks.length);
  const randomIceBlock = iceBlocks[randomIndex];
  const xCoord = randomIceBlock[0];
  const yCoord = randomIceBlock[1];
  matrix[xCoord][yCoord] = { type: 'enemy', direction: 'up', symbol: objects.enemy.symbol, isSliding: false };
  eggsRemaining--;
};

const moveEnemy = (xCoord, yCoord, matrix) => {
  const { availableDirections, canGoFurther } = filterAvailableDirections(xCoord, yCoord, matrix);
  // console.log('currentDirection:', matrix[xCoord][yCoord].direction);
  let newCoord = [];
  if (availableDirections.length === 0 && canGoFurther) { // 1 lépést előre --- így átmegy mindenen ki a pályáról
    // console.log('ÜRES A tömb, megy tovább');
    const currentDirection = matrix[xCoord][yCoord].direction;
    newCoord = stepTo(matrix, xCoord, yCoord, currentDirection); // kell vizsgálni, hogy szabad-e lépni abba az irányba
  } else {
    // console.log(availableDirections);
    const randomIndex = Math.floor(Math.random() * availableDirections.length); // lehet kell neki +1? Nem
    const newDirection = availableDirections[randomIndex];
    // console.log('random irány:', newDirection);
    matrix[xCoord][yCoord].direction = newDirection;
    newCoord = stepTo(matrix, xCoord, yCoord, newDirection);
  }
  return `${newCoord[0]}${newCoord[1]}`;
};

module.exports = { moveEnemy, filterAvailableDirections, countEnemies };
