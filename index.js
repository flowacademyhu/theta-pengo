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


// Matrix Dimension: (wall included): 

const matrix = matrixFunctions.generateMatrix(17, 15);

// KeyPress Action:
// turnPlayer megváltoztatva turnplayer(player, direstion ) ===> (direstion) -re
const keyProcessor = () => {
  stdin.on('data', (key) => {
    if (key === 'w') {
      playerMovement.turnPlayer('up');
      playerMovement.movePlayer(objects.player, objects.player.direction, matrix);
    }
    if (key === 's') {
      playerMovement.turnPlayer('down');
      playerMovement.movePlayer(objects.player, objects.player.direction, matrix);
    }
    if (key === 'a') {
      playerMovement.turnPlayer('left');
      playerMovement.movePlayer(objects.player, objects.player.direction, matrix);
    }
    if (key === 'd') {
      playerMovement.turnPlayer('right');
      playerMovement.movePlayer(objects.player, objects.player.direction, matrix);
    }
    if (key === 'k') {
      iceAlteration.pushIce(objects.player, matrix);
    }
    if (key === 'l') {
      iceAlteration.destroyIce(objects.player, matrix);
    }
    if (key === 'q') {
      process.exit(0);
    }
  }
  );
};



// Initialiseing matrix and its functions from matrixFunction.js : 

const init = () => {
  // 
  console.clear();
  matrixFunctions.fillMatrixFromFile(matrix, dataFromFile, objects.player);
  matrixFunctions.printMatrix(matrix);
};


//STEP FUNCTION : 

const loop = () => {
  setInterval(() => {
    // console.clear();
    let storingArr = [];
    console.log(storingArr);
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j].type === 'slidingBlock' && !storingArr.includes(i, j)) {
          iceAlteration.slide(matrix, i, j)
          let storingVariable = `${i} , ${j}`;
          storingArr.push(storingVariable);
          console.log(storingArr);
        }
      }
    }
    matrixFunctions.printMatrix(matrix);
  }, 500);
};

init();
loop();
keyProcessor()
