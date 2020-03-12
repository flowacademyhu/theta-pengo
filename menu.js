//A menu: meghívja a headlinePengót amit egyból printel és alá printeli az üres mátrixot, majd a megfelelő keyStrokera belepusholja a megfelelő szót.

const headLine = require('./headlinePENGO');
const button = require('./buttonMatrixes');
const stdin = process.stdin;
stdin.setEncoding('utf8');

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

const upSlide = (base, slide) => {

  let counter = 6;
  
  setInterval(() => {
    
    console.clear();
    
    for ( let i = 0, k = slide.length - 1; i < base.length, k >= 0; i++, k--) {
      if ( counter === 6) {
        base[0] = slide[slide.length - 1];
        
      } 
      if ( base[0] === slide[slide.length - 1] && counter === 5) {
        base[0] = slide[slide.length - 2];
        base[1] = slide[slide.length - 1];
        
        
      }
      if ( base[0] === slide[slide.length - 2] && counter === 4) {
        base[0] = slide[slide.length - 3];
        base[1] = slide[slide.length - 2];
        base[2] = slide[slide.length - 1];
        
        
      }
      if ( base[0] === slide[slide.length - 3] && counter === 3) {
        base[0] = slide[slide.length - 4];
        base[1] = slide[slide.length - 3];
        base[2] = slide[slide.length - 2];
        base[3] = slide[slide.length - 1];
        
        
      }
      if ( base[0] === slide[slide.length - 4] && counter === 2) {
        base[0] = slide[slide.length - 5];
        base[1] = slide[slide.length - 4];
        base[2] = slide[slide.length - 3];
        base[3] = slide[slide.length - 2];
        base[4] = slide[slide.length - 1];
        
        
      }
      if ( base[0] === slide[slide.length - 5] && counter === 1) {
        base[0] = slide[slide.length - 6];
        base[1] = slide[slide.length - 5];
        base[2] = slide[slide.length - 4];
        base[3] = slide[slide.length - 3];
        base[4] = slide[slide.length - 2];
        base[5] = slide[slide.length - 1];
        
        
      }
    };
    counter --;
    headLine.headlinePrinter();
    for (let i = 0; i < base.length; i++) {
      for (let j = 0; j < base[i].length; j++) {
        if ( base[i][j] !== ' ' ) {
          console.log(String.raw`${base[i]}`)
        }
      }
    }
  }, 100);  
};
  
const downSlide = (base, slide) => {

  let counter = 6;
  
  setInterval(() => {
    
    console.clear();
    
    for ( let i = base.length - 1, k = 0; i >= 0, k < slide.length; i--, k++) {
      if ( counter === 6) {
        base[base.length - 1]= slide[0];
      } 
      if ( base[base.length - 1] === slide[0] && counter === 5) {
        base[base.length - 1] = slide[1];
        base[base.length - 2] = slide[0];
      }

      if ( base[base.length - 1] === slide[1] && counter === 4) {
        base[base.length - 1] = slide[2];
        base[base.length - 2] = slide[1];
        base[base.length - 3] = slide[0];
      }

      if ( base[base.length - 1] === slide[2] && counter === 3) {
        base[base.length - 1] = slide[3];
        base[base.length - 2] = slide[2];
        base[base.length - 3] = slide[1];
        base[base.length - 4] = slide[0];
      }

      if ( base[base.length - 1] === slide[3] && counter === 2) {
        base[base.length - 1] = slide[4];
        base[base.length - 2] = slide[3];
        base[base.length - 3] = slide[2];
        base[base.length - 4] = slide[1];
        base[base.length - 5] = slide[0];
      }

      if ( base[base.length - 1] === slide[4] && counter === 1) {
        base[base.length - 1] = slide[5];
        base[base.length - 2] = slide[4];
        base[base.length - 3] = slide[3];
        base[base.length - 4] = slide[2];
        base[base.length - 5] = slide[1];
        base[base.length - 6] = slide[0];
      }
    };
    counter --;
    headLine.headlinePrinter();
    for (let i = 0; i < base.length; i++) {
      for (let j = 0; j < base[i].length; j++) {
        if ( base[i][j] !== ' ' ) {
          console.log(String.raw`${base[i]}`)
        }
      }
    }
  }, 75);  
};

const menu = () => {
  upSlide(base, button.play)
  let key = readlineSync.keyIn('',
    {hideEchoBack: true, mask: '', limit: '\u001b[A \u001b[B \uE007' });
  while(true) {
    if (key === '\u001b[A') {
      downSlide(base, button.maps)
    }
  }
  
}

