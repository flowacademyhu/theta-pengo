
// Requirements :
const mapGen = require('./mapGen.js');
const matrixFunctions = require('./matrixFunctions');
const objects = require('./objects');
const playerMovement = require('./playerMovement');
const enemyMovement = require('./enemyMovement');
const iceAlteration = require('./iceAlteration');
let stdin;
let t;
const fs = require('fs');
const mpg = require('mpg123');
const sfx = new mpg.MpgPlayer();
let fileName = 'map_prototype.txt';
let xSize = 17;
let ySize = 15;
let playerLives = 3;
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

const keyPress = (key) => {
  if (key === 'w' || key === 'W') {
    playerMovement.turnPlayer('up');
    playerMovement.movePlayer(objects.player, objects.player.direction, matrix);
  }
  if (key === 's'|| key === 'S') {
    playerMovement.turnPlayer('down');
    playerMovement.movePlayer(objects.player, objects.player.direction, matrix);
  }
  if (key === 'a' || key === 'A') {
    playerMovement.turnPlayer('left');
    playerMovement.movePlayer(objects.player, objects.player.direction, matrix);
  }
  if (key === 'd' || key === 'D') {
    playerMovement.turnPlayer('right');
    playerMovement.movePlayer(objects.player, objects.player.direction, matrix);
  }
  if (key === 'k' || key === 'K'|| key === '\u0020') {
    iceAlteration.pushIce(objects.player, matrix);
  }
  if (key === 'l'|| key === 'L') {
    iceAlteration.destroyIce(objects.player, matrix);
  }
  if (key === 'q'|| key === 'Q') {
    stdin.removeAllListeners('data');
    clearInterval(t)
    const menuLoader = require('./menu').menu();
  }
}

const keyProcessor = () => {
  stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', keyPress);
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
const countingMax = 3;

const loop = () => {
   t = setInterval(() => {
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
    matrixFunctions.printMatrix(matrix);
    console.log('lives: ', playerLives);
    console.log('enemies:', enemyMovement.countEnemies(matrix));
    countingVar++;
    if (countingVar === countingMax + 1) {
      countingVar = 0;
    }
    if (playerMovement.isPlayerDead(matrix) && playerLives === 0) {
      sfx.play('./sfx/urdead.mp3');
      console.clear();
      console.log('REKT');
      clearInterval(t);
      keyPress('q' || 'Q');
    }
    if (playerMovement.isPlayerDead(matrix)) {
      playerMovement.randomPlacePlayer(matrix);
      playerLives--;
    }
    if (enemyMovement.countEnemies(matrix) === 0) {
      setTimeout(() => {
        sfx.play('./sfx/winner.mp3');
      }, 5000);
      console.clear();
      console.log('GG');
      clearInterval(t);
      keyPress('q' || 'Q');
    }
  }, 175);
};

const main = () => {
  init();
  loop();
  keyProcessor();
}


module.exports = { main };
