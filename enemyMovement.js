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

const moveEnemy = (xCoord, yCoord, matrix) => {
  const { availableDirections, canGoFurther } = filterAvailableDirections(xCoord, yCoord, matrix);
  //
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

    // Random irány
    // const randomIndex = Math.random()*availableDirections.length;
    // const newDirection = arr[randomIndex]
    // stepTo(newDirection)
  }
  return `${newCoord[0]}${newCoord[1]}`;
};

// max 4 for-ral fgv, ami megkapja a szörny valid irányait és az alapján for up, ha fal -> break, ha játékos, akkor arra megy. getAvailableDirections adja a for-ok alapirányait, és végül irányt adunk vissza
// ha irány UP, for x/y tengelyen

/* if (matrix[xCoord][yCoord].direction === ) */ // ha az utolsó direction irányába tud még lépni, akkora arra lépjen még egyet

module.exports = { moveEnemy, filterAvailableDirections };
