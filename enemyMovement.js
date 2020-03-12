const objects = require('./objects');

const oppositeDirs = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left'
};
const stepTo = (matrix, x, y, direction) => { // OK
  if (direction === 'up') {
    x--;
    matrix[x][y] = matrix[x + 1][y];
    matrix[x + 1][y] = objects.floor;
  } else if (direction === 'down') {
    x++;
    matrix[x][y] = matrix[x - 1][y];
    matrix[x - 1][y] = objects.floor;
  } else if (direction === 'left') {
    y--;
    matrix[x][y] = matrix[x][y + 1];
    matrix[x][y + 1] = objects.floor;
  } else if (direction === 'right') {
    y++;
    matrix[x][y] = matrix[x][y - 1];
    matrix[x][y - 1] = objects.floor;
  }
  return [x, y];
};

const getAvailableDirections = (x, y, matrix) => { // getAvailableDirections (x, y, arr) OK
  const availableDirections = [];
  if (matrix[x - 1][y].type === 'floor' || matrix[x - 1][y].type === 'player') {
    availableDirections.push('up');
  }
  if (matrix[x + 1][y].type === 'floor' || matrix[x + 1][y].type === 'player') {
    availableDirections.push('down');
  }
  if (matrix[x][y - 1].type === 'floor' || matrix[x][y - 1].type === 'player') {
    availableDirections.push('left');
  }
  if (matrix[x][y + 1].type === 'floor' || matrix[x][y + 1].type === 'player') {
    availableDirections.push('right');
  }
  return availableDirections;
};

const filterAvailableDirections = (x, y, matrix) => { // el kell különíteni, hogy merre mehet, és mi merre akarjuk, hogy menjen
  const availableDirections = getAvailableDirections(x, y, matrix);
  const currentDirection = matrix[x][y].direction;
  // console.log(x, y);
  // console.log('availableDirections1:', availableDirections);
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
  if (isAround(matrix, x, y, 'ice')) {

  }
};

const isAround = (matrix, x, y, thing) => {
  if (matrix[x + 1][y].type === thing || matrix[x - 1][y].type === thing ||
    matrix[x][y + 1].type === thing || matrix[x][y - 1].type === thing) {
    return true;
  }
  return false;
};

const collectIceBlocksAtTheEdge = (matrix) => {
  const ices = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].type === 'ice' && isAround(matrix, i, j, 'floor') && !isAround(matrix, i, j, 'player')) {
        ices.push([i, j]);
      }
    }
  }
  return ices;
};

const hatch = (matrix) => {
  const ices = collectIceBlocksAtTheEdge(matrix);
  const randomIndex = Math.floor(Math.random() * ices.length);
  const randomice = ices[randomIndex];
  const x = randomice[0];
  const y = randomice[1];
  matrix[x][y] = { type: 'enemy', direction: 'up', symbol: objects.enemy.symbol, isSliding: false };
  eggsRemaining--;
};

const moveEnemy = (x, y, matrix) => {
  let newCoord = [];
  const eatYouAlive = iWillEatYou(x, y, matrix);
  if (eatYouAlive) {
    newCoord = stepTo(matrix, x, y, eatYouAlive);
    return `${newCoord[0]}${newCoord[1]}`;
  }

  const { availableDirections, canGoFurther } = filterAvailableDirections(x, y, matrix);
  if (availableDirections.length === 0 && canGoFurther) { // 1 lépést előre --- így átmegy mindenen ki a pályáról
    // console.log('ÜRES A tömb, megy tovább');
    const currentDirection = matrix[x][y].direction;
    newCoord = stepTo(matrix, x, y, currentDirection); // kell vizsgálni, hogy szabad-e lépni abba az irányba
  } else {
    const randomIndex = Math.floor(Math.random() * availableDirections.length); // lehet kell neki +1? Nem
    const newDirection = availableDirections[randomIndex];
    // console.log('random irány:', newDirection);
    matrix[x][y].direction = newDirection;
    newCoord = stepTo(matrix, x, y, newDirection);
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
      } else if (matrix[x][yCoord].type === 'ice') {
        break;
      }
    }
  }
  if (availableDirs.includes('down')) {
    for (let x = xCoord; x < matrix.length; x++) {
      if (matrix[x][yCoord].type === 'player') {
        return 'down';
      } else if (matrix[x][yCoord].type === 'ice') {
        break;
      }
    }
  }
  if (availableDirs.includes('left')) {
    for (let y = yCoord; y >= 0; y--) {
      if (matrix[xCoord][y].type === 'player') {
        return 'left';
      } else if (matrix[xCoord][y].type === 'ice') {
        break;
      }
    }
  } if (availableDirs.includes('right')) {
    for (let y = yCoord; y < matrix[0].length; y++) {
      if (matrix[xCoord][y].type === 'player') {
        return 'right';
      } else if (matrix[xCoord][y].type === 'ice') {
        break;
      }
    }
  }
};

module.exports = { moveEnemy, filterAvailableDirections, iWillEatYou, countEnemies, isAround };
