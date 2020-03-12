const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Requirements :
const mapGen = require('./mapGen.js');
const matrixFunctions = require('./matrixFunctions');
const objects = require('./objects');
const playerMovement = require('./playerMovement');
const enemyMovement = require('./enemyMovement');
const iceAlteration = require('./iceAlteration');
const fs = require('fs');
let fileName = 'map_prototype.txt';
let xSize = 17;
let ySize = 15;
if (process.argv[2] === 'random') {
  fileName = 'random_map.txt';
  xSize = 22;
  ySize = 22;
}
const matrix = matrixFunctions.generateMatrix(xSize, ySize);
const dataFromFile = fs.readFileSync(fileName, 'utf-8', (err, data) => {
  if (err) throw err;
  return data;
});

// Matrix Dimension: (wall included):

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

// Initialising matrix and its functions from matrixFunction.js :

const init = () => {
  console.clear();
  mapGen.init();
  matrixFunctions.fillMatrixFromFile(matrix, dataFromFile);
  matrixFunctions.printMatrix(matrix);
};

// STEP FUNCTION :
let countingVar = 0;
const countingMax = 2;

const loop = () => {
  const t = setInterval(() => {
    console.clear();
    const storingArr = [];
    const storingEnemyCoord = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j].type === 'slidingBlock' && !storingArr.includes(`${i}${j}`)) {
          storingArr.push(iceAlteration.slide(matrix, i, j));
        }
        if (matrix[i][j].type === 'enemy' && !storingEnemyCoord.includes(`${i}${j}`) && !matrix[i][j].isSliding && countingVar === countingMax) {
          storingEnemyCoord.push(enemyMovement.moveEnemy(i, j, matrix));
        }
      }
    }
    enemyMovement.countEnemies(matrix);
    matrixFunctions.printMatrix(matrix);
    countingVar++;
    if (countingVar === countingMax + 1) {
      countingVar = 0;
    }
    if (playerMovement.isPlayerDead(matrix)) {
      console.clear();
      console.log('REKT');
      clearInterval(t);
    }
    if (enemyMovement.enemyCount === 0) {
      console.clear();
      console.log('GG');
      clearInterval(t);
    }
  }, 75);
};

init();
loop();
keyProcessor();

module.exports = { init, loop, keyProcessor };
