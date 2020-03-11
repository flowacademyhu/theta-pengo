//A menu: meghívja a headlinePengót amit egyból printel és alá printeli az üres mátrixot, majd a megfelelő keyStrokera belepusholja a megfelelő szót.

const headLine = require('./headlinePENGO');
const button = require('./buttonMatrixes');



const generateSliderMatrix = (x, y) => {
  const matrix = new Array(x);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(y);
  }
  return matrix;
};

// 	U+0020, \u0020	Space
// '\u001b[C' left , '\u001b[D'


// const menu = () => {
//   while (true) {
//     //menu kirajzolás, 
//     //readline sync caracter beolvasás : tehát ha arrow keyt nyomok mi történjen 
// //     key = readlineSync.keyIn('',
// //     {hideEchoBack: true, mask: '', limit: 'zx '});
// //   if (key === 'z') { if (value > MIN) { value--; } }
// //   else if (key === 'x') { if (value < MAX) { value++; } }
// //   else { break; }
// // }
//   }
// }

let base = generateSliderMatrix(6, 50);

const leftSlide = (base, slide) => {
  for (let i = 0, k = 0; i < base.length, k < slide.length; i++, k++) {
    for (let j = 0, l = 0; j < base[i].length, l < slide[i].length; j++, l ++) {
      process.stdout.write(base[i][j] = ' ');
    }
    console.log();
  }
};

leftSlide(base, button.play);