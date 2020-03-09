const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

.typeconst iceMovement = requi.typere('./iceAlteration')
const matrixFunctions = require('./matrixFunctions');
const objects = require('./objects');
const fs = require('fs');

const enemy = objects.enemy;
const turnEnemy = (enemy, direction) => {
  enemy.direction = direction;
};

const randomMove = () => {
matrix[enemy.xCoord][enemy.yCoord] = enemy;
  return Math.floor(Math.random() * 4);
};

const moveEnemy = (enemy, direction, matrix) => {
  // let isValid = false;
  // while(!isValid){
  //   const dir = moveEnemy()
  // if fel jég vagy false,
  // akkor randomMove


  if (randomMove() === 0 && enemy.xCoord > 0 && matrix[enemy.xCoord - 1][enemy.yCoord].type !== 'ice' && matrix[enemy.xCoord - 1][enemy.yCoord].type !== 'wall') { // up
    enemy.xCoord--;
    matrix[enemy.xCoord][enemy.yCoord] = enemy;
    matrix[enemy.xCoord + 1][enemy.yCoord].type = 'floor';
  } else if (randomMove() === 1 && enemy.xCoord < matrix.length - 1 && matrix[enemy.xCoord + 1][enemy.yCoord].type !== 'ice' && matrix[enemy.xCoord - 1][enemy.yCoord].type !== 'wall') { // down
    enemy.xCoord++;
    matrix[enemy.xCoord][enemy.yCoord] = enemy;
    matrix[enemy.xCoord - 1][enemy.yCoord].type = 'floor';
  } else if (randomMove() === 2 && enemy.yCoord > 0 && matrix[enemy.xCoord][enemy.yCoord - 1].type !== 'ice' && matrix[enemy.xCoord - 1][enemy.yCoord].type !== 'wall') { // left
    enemy.yCoord--;
    matrix[enemy.xCoord][enemy.yCoord] = enemy;
    matrix[enemy.xCoord][enemy.yCoord + 1].type = 'floor';
  } else if (randomMove() === 3 && enemy.yCoord < matrix[0].length - 1 && matrix[enemy.xCoord][enemy.yCoord + 1].type !== 'ice' && matrix[enemy.xCoord - 1][enemy.yCoord].type !== 'wall') { // right
    enemy.yCoord++;
    matrix[enemy.xCoord][enemy.yCoord] = enemy;
    matrix[enemy.xCoord][enemy.yCoord - 1].type = 'floor';
  }
};


//collision (implement in moveEnemy pls.):


const collision = (obj1, obj2) => {
  if (obj1.type === 'slidingBlock' && obj2.type === 'enemy') {
    obj2 = { type: 'blood', symbol: objects.blood.symbol };
  }
}

module.exports = { moveEnemy };