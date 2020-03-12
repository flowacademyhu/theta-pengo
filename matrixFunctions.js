const objects = require('./objects');

const generateMatrix = (x, y) => {
  const matrix = new Array(x);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(y);
  }
  return matrix;
};

const printMatrix = (matrix) => {
  let string = '';
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j].type === 'wall') {
        string += matrix[i][j].symbol + ' ';
        // process.stdout.write(matrix[i][j].symbol);
      } else {
        string += matrix[i][j].symbol + ' ';
        // process.stdout.write(matrix[i][j].symbol + ' ');
      }
    }
    string += '\n';
    // console.log();
  }
  console.log(string);
};

const fillMatrixFromFile = (matrix, data) => {
  const modifiedData = data.replace(/,/g, '').replace(/\n/g, '').replace(/ /g, '');
  let dataIndex = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = modifiedData[dataIndex];
      dataIndex++;
      if (matrix[i][j] === '0') {
        matrix[i][j] = { type: 'floor', symbol: objects.floor.symbol };
      }
      if (matrix[i][j] === '1') {
        matrix[i][j] = { type: 'ice', symbol: objects.ice.symbol };
      }
      if (matrix[i][j] === 'E') {
        matrix[i][j] = { type: 'enemy', direction: 'up', symbol: objects.enemy.symbol, isSliding: false };
      }
      if (matrix[i][j] === 'P') {
        matrix[i][j] = objects.player;
        objects.player.xCoord = i;
        objects.player.yCoord = j;
      }
      if (matrix[i][j] === 'X') {
        matrix[i][j] = { type: 'wall', symbol: objects.wall.symbol };
      }
    }
  }
};

module.exports = { generateMatrix, printMatrix, fillMatrixFromFile };
