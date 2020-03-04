let objects = require('./objects');

const generateMatrix = (x, y) => {
  const matrix = new Array(x);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(y);
  }
  return matrix;
};

const printMatrix = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      process.stdout.write(matrix[i][j].symbol + ' ');
    }
    console.log();
  }
};

const fillMatrixFromFile = (matrix, data) => {
  const modifiedData = data.replace(/,/g, '').replace(/\n/g, '');
  let dataIndex = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = modifiedData[dataIndex];
      dataIndex++;
      if (matrix[i][j] === '0') {
        matrix[i][j] = objects.floor;
      }
      if (matrix[i][j] === '1') {
        matrix[i][j] = objects.ice;
      }
      if (matrix[i][j] === 'A') {
        matrix[i][j] = objects.enemy1;
        objects.enemy1.xCoord = i;
        objects.enemy1.yCoord = j;
      }
      if (matrix[i][j] === 'B') {
        matrix[i][j] = objects.enemy2;
        objects.enemy2.xCoord = i;
        objects.enemy2.yCoord = j;
      }
      if (matrix[i][j] === 'C') {
        matrix[i][j] = objects.enemy3;
        objects.enemy3.xCoord = i;
        objects.enemy3.yCoord = j;
      }
      if (matrix[i][j] === 'P') {
        matrix[i][j] = objects.player;
        objects.player.xCoord = i;
        objects.player.yCoord = j;
      }
    }
  }
};

module.exports = { generateMatrix, printMatrix, fillMatrixFromFile };
