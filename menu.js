//A menu: meghívja a headlinePengót amit egyból printel és alá printeli az üres mátrixot, majd a megfelelő keyStrokera belepusholja a megfelelő szót.

const headLine = require('./headlinePENGO');
const button = require('./buttonMatrixes');
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const generateSliderMatrix = (x, y) => {
  const matrix = new Array(x);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(y);
  }
  return matrix;
};




const keyInputAction = () => {
  stdin.on((key) => {
    if ( key === )
    
  }
  )
};


let slider = generateSliderMatrix(6, 50);

const printMatrix = (slider) => {
  for (let i = 0; i < slider.length; i++) {
    for (let j = 0; j < slider[i].length; j++) {
      process.stdout.write(slider[i][j] = 'a');
    }
    console.log();
  }
};

printMatrix(slider);