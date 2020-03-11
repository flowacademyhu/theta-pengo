//A menu: meghívja a headlinePengót amit egyból printel és alá printeli az üres mátrixot, majd a megfelelő keyStrokera belepusholja a megfelelő szót.

const headLine = require('./headlinePENGO');
const button = require('./buttonMatrixes');



const generateSliderMatrix = (x, y) => {
  const matrix = new Array(x);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(y);
    // for ( let j = 0; j < matrix[i].length; j++) {
    //   matrix[i][j] = ' ';
    // }
  }
  return matrix;
};


let base = generateSliderMatrix(6, 8);

//felfelé mozgás mechanizmusa:

const upSlide = (base, slide) => {
  let counter = 6;
  const t = setInterval(() => {

    console.clear();
    for (let  k = slide.length - 1;  k >= 0; k-- ) {
      if ( counter === 6) {
       base[1] = slide[slide.length - 1];
       };

       if ( base[1] === slide[slide.length - 1] && counter === 5) {
         base.pop(base[base.length -1])
         base[2] = slide[slide.length - 1];
         base[1] = slide[slide.length - 2];
       };

       if ( base[2] === slide[slide.length -1] && counter === 4) {
         base.pop(base[base.length -1]);
         base[3] = slide[slide.length - 1];
         base[2] = slide[slide.length - 2];
         base[1] = slide[slide.length - 3];
       };

       if ( base[3] === slide[slide.length -1] && counter === 3) {
         base.pop(base[base.length -1]);
         base[4] = slide[slide.length - 1];
         base[3] = slide[slide.length - 2];
         base[2] = slide[slide.length - 3];
         base[1] = slide[slide.length - 4];
        
       };      
       if ( base[4] === slide[slide.length -1] && counter === 2) {
         base.pop(base[base.length -1]);
         base[5] = slide[slide.length - 1];
         base[4] = slide[slide.length - 2];
         base[3] = slide[slide.length - 3];
         base[2] = slide[slide.length - 4];
         base[1] = slide[slide.length - 5];
        
       };
       if ( base[5] === slide[slide.length -1] && counter === 1) {
         base.pop(base[base.length -1]);
         base[6] = slide[slide.length - 1];
         base[5] = slide[slide.length - 1];
         base[4] = slide[slide.length - 2];
         base[3] = slide[slide.length - 3];
         base[2] = slide[slide.length - 4];
         base[1] = slide[slide.length - 5];    
        };
        if ( base[6] === slide[slide.length -1] && counter === 0) {
          base.pop(base[base.length -1]);
        base[7] = slide[slide.length - 1];
        base[6] = slide[slide.length - 2];
        base[5] = slide[slide.length - 3];
        base[4] = slide[slide.length - 4];
        base[3] = slide[slide.length - 5];
        base[2] = slide[slide.length - 6];
        base[1] = slide[slide.length - 7];  
      }; 
    };
    counter --;
    headLine.headlinePrinter();
    for (let i = 0; i < base.length; i++ ) {
      if (base[i] !== ' ' && base[i] !== '.' && base[i] !== undefined) {
        console.log(String.raw`${base[i]}`)
      }
    }
  }, 100)
};


 const downSlide = (base, slide) => {
   const t = setInterval(() => {
     for (let i = 0, k = 0; i < base.length, k < slide.length; i++, k++) {
       for (let j = 0, l = 0; j < base[i].length, l < slide[k].length; j++, l ++) {
         base[i][j] = slide[k][l];
       }
       process.stdout.write(base[i][0]);
       console.log();
     }
   }, 1000)
 }


//  	U+0020, \u0020	Space
//  '\u001b[C' left , '\u001b[D'


//  const menu = () => {
//    while (true) {
//      menu kirajzolás, 
//      readline sync caracter beolvasás : tehát ha arrow keyt nyomok mi történjen 
//       key = readlineSync.keyIn('',
//       {hideEchoBack: true, mask: '', limit: 'zx '});
//     if (key === 'z') { if (value > MIN) { value--; } }
//     else if (key === 'x') { if (value < MAX) { value++; } }
//     else { break; }
//   }
//    }
//  }



upSlide(base, button.play)

