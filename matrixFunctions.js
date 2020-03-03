let objects = require('./objects');

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
        output = matrix[i][j].symbol;
      } 
      else if (matrix[i][j] === '1') {
        output = {symbol:'J'}
      } 
      else if (matrix[i][j] === '2'){
        output = {symbol:'@'}
      }
      else if (matrix[i][j] === '3') {
        output = {symbol: 'P'}
      }
      line += (output + ' ');
    }
    console.log(line);
    line = '';
  }
  return output;
};

const fillMatrixFromFile = (matrix, data) => {
  const modifiedData = data.replace(/,/g, '').replace(/\n/g, '');
  let dataIndex = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = modifiedData[dataIndex];
      dataIndex++;
      if (matrix[i][j] === '0') {
          matrix[i][j] = {type:'floor', symbol:' '};
      }
      if ( matrix[i][j] === '1') {
        matrix[i][j] = {type:'iceblock', symbol: 'J'}
      }
      if (matrix[i][j] === '2') {
        matrix[i][j] = {type:'enemy', symbol: '@'}
      }
      if (matrix[i][j] === '3') {
        matrix[i][j] = {type:'player', symbol: 'P'}
      }
    }
  }
};      

module.exports = { generateMatrix, printMatrix, fillMatrixFromFile }
