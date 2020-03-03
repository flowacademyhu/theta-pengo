
const generateMatrix = (x, y) => {
  const matrix = new Array(x);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(y);
  }
  return matrix;
};

const printMatrix = (matrix) => {
  let output = '';
  let line = '';
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '0') {
        output = ' ';
      } else if (matrix[i][j] === '1') {
        output = 'J';
      } else output = matrix[i][j];
      line += (output + ' ');
    }
    console.log(line);
    line = '';
  }
};

const fillMatrixFromFile = (matrix, data) => {
  const modifiedData = data.replace(/,/g, '').replace(/\n/g, '');
  let dataIndex = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = modifiedData[dataIndex];
      dataIndex++;
    }
  }
};

module.exports = { generateMatrix, printMatrix, fillMatrixFromFile };
