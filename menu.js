//A menu: meghívja a headlinePengót amit egyból printel és alá printeli az üres mátrixot, majd a megfelelő keyStrokera belepusholja a megfelelő szót.
const chalk = require('chalk');
const readlineSync = require('readline-sync')
const headLine = require('./headlinePENGO');
const button = require('./buttonMatrixes');
const game = require('./index');

const menuOptions = ['fix','random', 'scores', 'exit'];
let currentSelected = 0;

const timeout = (time) => {
  return new Promise(resolve => setTimeout(resolve, time));
}

const stepDown = (base) => {
  for (let x = base.length - 2; x >= 0; x--) {
    base[x + 1] = base[x];
  }
}

const stepUp = (base) => {
  for (let x = 0; x < base.length - 1; x++) {
    base[x] = base[x + 1];
  }
}

const generateSliderMatrix = (x, y) => {
  matrix = new Array(x);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(y);
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = ' ';
    }
  }
  return matrix;
};


let base = generateSliderMatrix(6, 8);

let basePrint = () => {
  for (let i = 0; i < base.length; i++) {
    for (let j = 0; j < base[i].length; j++) {
      console.log(String.raw`${base[i][j]}`);

    }
  }
}

let counter = 6;
const upSlide = async (base, slide) => {

  if (counter > 1) stepDown(base);
  console.clear();
  headLine.headlinePrinter();

  for (let i = 0, k = slide.length - 1; i < base.length, k >= 0; i++, k--) {
    if (counter === 6) {
      base[0] = slide[slide.length - 1];

    }
    if (base[0] === slide[slide.length - 1] && counter === 5) {
      base[0] = slide[slide.length - 2];
      base[1] = slide[slide.length - 1];


    }
    if (base[0] === slide[slide.length - 2] && counter === 4) {
      base[0] = slide[slide.length - 3];
      base[1] = slide[slide.length - 2];
      base[2] = slide[slide.length - 1];


    }
    if (base[0] === slide[slide.length - 3] && counter === 3) {
      base[0] = slide[slide.length - 4];
      base[1] = slide[slide.length - 3];
      base[2] = slide[slide.length - 2];
      base[3] = slide[slide.length - 1];


    }
    if (base[0] === slide[slide.length - 4] && counter === 2) {
      base[0] = slide[slide.length - 5];
      base[1] = slide[slide.length - 4];
      base[2] = slide[slide.length - 3];
      base[3] = slide[slide.length - 2];
      base[4] = slide[slide.length - 1];


    }
    if (base[0] === slide[slide.length - 5] && counter === 1) {
      base[0] = slide[slide.length - 6];
      base[1] = slide[slide.length - 5];
      base[2] = slide[slide.length - 4];
      base[3] = slide[slide.length - 3];
      base[4] = slide[slide.length - 2];
      base[5] = slide[slide.length - 1];
    }
  }
  chalk.blue(basePrint(base));
  counter -= 1;
  // for (let i = 0; i < base.length; i++) {
  //   for (let j = 0; j < base[i].length; j++) {
  //     if ( base[i][j] !== ' ' && counter >= 0 ) {
  //       console.log(String.raw`${base[i]}`)
  //     }
  //   }
  // }
  if (counter >= 0) {
    await timeout(100);
    await upSlide(base, slide);
  }
};

let counter2 = 1;

const downSlide = async (base, slide) => {

  if (counter2 < 6) { stepUp(base)}
  console.clear();
  headLine.headlinePrinter();


  for (let i = base.length - 1, k = 0; i >= 0, k < slide.length; i--, k++) {
    if (counter2 === 1) {
      base[base.length - 1] = slide[0];
    }
    if (counter2 === 2) {
      base[base.length - 2] = slide[0];
      base[base.length - 1] = slide[1];
    }
    if (counter2 === 3) {
      base[base.length - 3] = slide[0];
      base[base.length - 2] = slide[1];
      base[base.length - 1] = slide[2];
    }
    if (counter2 === 4) {
      base[base.length - 4] = slide[0];
      base[base.length - 3] = slide[1];
      base[base.length - 2] = slide[2];
      base[base.length - 1] = slide[3];
    }
    if (counter2 === 5) {
      base[base.length - 5] = slide[0];
      base[base.length - 4] = slide[1];
      base[base.length - 3] = slide[2];
      base[base.length - 2] = slide[3];
      base[base.length - 1] = slide[4];
    }
    if (counter2 === 6) {
      base[base.length - 6] = slide[0];
      base[base.length - 5] = slide[1];
      base[base.length - 4] = slide[2];
      base[base.length - 3] = slide[3];
      base[base.length - 2] = slide[4];
      base[base.length - 1] = slide[5];
    }
  };

  basePrint(base);
  counter2++;

  if (counter2 <= 6) {
    await timeout(100);
    await downSlide(base, slide)
  }
};



const menu = async () => {
  while (true) {
    const key = readlineSync.keyIn(chalk.blue('  PRESS W/S/SPACE for UP/DOWN/ENTER'), 'wsWS ');

    await downSlide(base, button[menuOptions[currentSelected]]);

    if ((key === 's' || key === 'S') && currentSelected < 3) {
      await downSlide(base, button[menuOptions[currentSelected + 1]]);
      currentSelected++;
      counter2 = 1;
    }
    else if ((key === 'w' || key === 'W') && currentSelected > 0) {
      await upSlide(base, button[menuOptions[currentSelected - 1]]);
      currentSelected--;
      counter = 6;
    }
    if (menuOptions[currentSelected] === 'exit' && (key === '\u0020')) {

      console.clear();
      process.exit(0);

    }
    if (menuOptions[currentSelected] === 'scores' && (key === '\u0020')) {
      const scores = require('./scores');
      scores.readScore();
      // if ( key === '\u0020') {

      //   await downSlide(base, button[menuOptions[currentSelected]]);
      // }
    }
    if (menuOptions[currentSelected] === 'random' && (key === '\u0020')) {
      game.isRandom === true;
      game.main();
      break;
    }
    if (menuOptions[currentSelected] === 'fix' && (key === '\u0020')) {
      game.isRandom === false;
      game.main();
      break;
    }
  }
};


menu().then(() => { });
// downSlide(base, button.maps);
// upSlide(base, button.maps);

module.exports = { menu };
