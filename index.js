const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');


// Requirements :

const matrixFunctions = require('./matrixFunctions');
const objects = require('./objects');
const playerMovement = require('./playerMovement');
const enemyMovement = require('./enemyMovement');
const iceAlteration = require('./iceAlteration');
const fs = require('fs');
const dataFromFile = fs.readFileSync('map_prototype.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  return data;
});


// KeyPress Action:

const keyProcessor = () => {
  stdin.on('data', (key) => {
    if (key === 'w') {
      turnPlayer(player, 'up');
      movePlayer(player, matrix);
    }
    if (key === 's') {
      turnPlayer(player, 'down');
      movePlayer(player, matrix);
    }
    if (key === 'a') {
      turnPlayer(player, 'left');
      movePlayer(player, matrix);
    }
    if (key === 'd') {
      turnPlayer(player, 'right');
      movePlayer(player, matrix);
    }
    if (key === 'k') {
      pushIce(player, matrix);
    }
    if (key === 'l') {
      destroyIce(player, matrix);
    }
    if (key === 'q') {
      process.exit(0);
    }
  }
  );
};


// Matrix Dimension: (wall included): 

const matrix = matrixFunctions.generateMatrix(17, 15);


// Initialiseing matrix and its functions from matrixFunction.js : 

const init = () => {
  console.clear();
  matrixFunctions.fillMatrixFromFile(matrix, dataFromFile, objects.player);
  matrixFunctions.printMatrix(matrix);
};


//STEP FUNCTION : 

const loop = () => {
  setInterval(() => {
    console.clear();
    for (let i = 0; i < matrix.length; i++) { // ezt a részt majd a step fv-be rakjuk át
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j].type === 'slidingBlock' && matrix[i][j].direction === 'down' && matrix[i][j].didItSlide === false) {
          (matrix, i, j);
          matrix[i][j].didItSlide = true;
        }
        if (matrix[i][j].type === 'slidingBlock' && matrix[i][j].direction === 'right' && matrix[i][j].didItSlide === false) {
          slide(matrix, i, j);
          matrix[i][j].didItSlide = true;
        }
        matrix[i][j].didItSlide = false;
        if (matrix[i][j].type === 'slidingBlock' && matrix[i][j].direction !== 'down' && matrix[i][j].direction !== 'right') {
          slide(matrix, i, j);
        }
      }
    }
    matrixFunctions.printMatrix(matrix);
  }, 500);
};

init();
loop();
keyProcessor()
