const objects = require('./objects');

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
  const canGoFurther = availableDirections.includes(currentDirection);
  if (availableDirections.includes(currentDirection)) {
    availableDirections.splice(availableDirections.indexOf(currentDirection), 1);
  }
  if (availableDirections.includes(oppositeDirs[currentDirection])) {
    availableDirections.splice(availableDirections.indexOf(oppositeDirs[currentDirection]), 1);
  }
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

const breakIce = (matrix, x, y) => {

};

const isAround = (matrix, xCoord, yCoord, thing) => {
  if (matrix[xCoord + 1][yCoord].type === thing || matrix[xCoord - 1][yCoord].type === thing ||
    matrix[xCoord][yCoord + 1].type === thing || matrix[xCoord][yCoord - 1].type === thing) {
    return true;
  }
  return false;
};

const collectIceBlocksAtTheEdge = (matrix) => {
  const iceBlocks = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].type === 'ice' && isAround(matrix, i, j, 'floor') && !isAround(matrix, i, j, 'player')) {
        iceBlocks.push([i, j]);
      }
    }
  }
  return iceBlocks;
};
const hatch = (matrix) => {
  const iceBlocks = collectIceBlocksAtTheEdge(matrix);
  const randomIndex = Math.floor(Math.random() * iceBlocks.length);
  const randomIceBlock = iceBlocks[randomIndex];
  const xCoord = randomIceBlock[0];
  const yCoord = randomIceBlock[1];
  matrix[xCoord][yCoord] = { type: 'enemy', direction: 'up', symbol: objects.enemy.symbol, isSliding: false };
  eggsRemaining--;
};

const moveEnemy = (xCoord, yCoord, matrix) => {
  let newCoord = [];
  const eatYouAlive = iWillEatYou(xCoord, yCoord, matrix);
  if (eatYouAlive) {
    newCoord = stepTo(matrix, xCoord, yCoord, eatYouAlive);
    return `${newCoord[0]}${newCoord[1]}`;
  }

  const { availableDirections, canGoFurther } = filterAvailableDirections(xCoord, yCoord, matrix);
  if (availableDirections.length === 0 && canGoFurther) { // 1 lépést előre --- így átmegy mindenen ki a pályáról
    const currentDirection = matrix[xCoord][yCoord].direction;
    newCoord = stepTo(matrix, xCoord, yCoord, currentDirection); // kell vizsgálni, hogy szabad-e lépni abba az irányba
  } else {
    const randomIndex = Math.floor(Math.random() * availableDirections.length); // lehet kell neki +1? Nem
    const newDirection = availableDirections[randomIndex];
    matrix[xCoord][yCoord].direction = newDirection;
    newCoord = stepTo(matrix, xCoord, yCoord, newDirection);
  }
  return `${newCoord[0]}${newCoord[1]}`;
};

// enemy kövesse a playert, ha látja a folyosón
// max 4 for-ral fgv, ami megkapja a szörny valid irányait és az alapján for up keresés, ha fal -> break, ha játékos, akkor arra megy. getAvailableDirections adja a for-ok alapirányait, és végül irányt adunk vissza
// ha irány UP, for x/y tengelyen

const iWillEatYou = (xCoord, yCoord, matrix) => {
  const availableDirs = getAvailableDirections(xCoord, yCoord, matrix);
  if (availableDirs.includes('up')) {
    for (let x = xCoord; x >= 0; x--) {
      if (matrix[x][yCoord].type === 'player') {
        return 'up';
      } else if (matrix[x][yCoord].type === 'iceblock') {
        break;
      }
    }
  }
  if (availableDirs.includes('down')) {
    for (let x = xCoord; x < matrix.length; x++) {
      if (matrix[x][yCoord].type === 'player') {
        return 'down';
      } else if (matrix[x][yCoord].type === 'iceblock') {
        break;
      }
    }
  }
  if (availableDirs.includes('left')) {
    for (let y = yCoord; y >= 0; y--) {
      if (matrix[xCoord][y].type === 'player') {
        return 'left';
      } else if (matrix[xCoord][y].type === 'iceblock') {
        break;
      }
    }
  } if (availableDirs.includes('right')) {
    for (let y = yCoord; y < matrix[0].length; y++) {
      if (matrix[xCoord][y].type === 'player') {
        return 'right';
      } else if (matrix[xCoord][y].type === 'iceblock') {
        break;
      }
    }
  }
};

module.exports = { moveEnemy, filterAvailableDirections, iWillEatYou };
