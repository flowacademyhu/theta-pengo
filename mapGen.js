const createArray = (x, y, num) => {
  const array = [];
  for (let i = 0; i < x; i++) {
    array.push([]);
    for (let j = 0; j < y; j++) {
      array[i].push(num);
    }
  }
  return array;
};
const createMap = () => {
  const x = 15;
  const y = 13;
  let maxTunnels = 40;
  const maxLength = 25;

  const map = createArray(x, y, '#');

  let currentRow = Math.floor(Math.random() * x);
  let currentColumn = Math.floor(Math.random() * y);
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let randomDirection;
  let lastDirection = [];
  while (maxTunnels && x && y && maxLength) {
    do {
      randomDirection = directions[Math.floor(Math.random() * directions.length)];
    } while ((randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]) ||
      (randomDirection[0] === -lastDirection && randomDirection[1] === -lastDirection[1]));
    let randomLength = Math.ceil(Math.random() * maxLength);
    let tunnelLength = 0;

    while (tunnelLength < randomLength) {
      if ((currentRow === 0 && randomDirection[0] === -1) || (currentColumn === 0 && randomDirection[1] === -1) ||
        ((currentRow === x - 1) && randomDirection[0] === 1) || (currentColumn === y - 1 && randomDirection[1] === 1)) {
        break;
      } else {
        map[currentRow][currentColumn] = ' ';
        currentRow += randomDirection[0];
        currentColumn += randomDirection[1];
        tunnelLength++;
      }
    }
    if (tunnelLength) {
      lastDirection = randomDirection;
      maxTunnels--;
    }
  }
  return map;
};

const copyMapIntoBiggerMap = (map) => {
  const newMap = new Array(map.length + 2);
  for (let i = 0; i < newMap.length; i++) {
    newMap[i] = new Array(map[0].length + 2);
  }
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      newMap[i + 1][j + 1] = map[i][j];
    }
  }
  return newMap;
};

const addWallsToMap = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (i === 0 || j === 0 || i === map.length - 1 || j === map[i].length - 1) {
        map[i][j] = 'X';
      }
    }
  }
  return map;
};
console.log(addWallsToMap(copyMapIntoBiggerMap(createMap())));