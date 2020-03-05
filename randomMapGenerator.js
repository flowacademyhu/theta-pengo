let objects = require('./objects');

let blockcount = Math.floor(Math.random() * 85+1);
console.log(blockcount);

const randomMap = (blockcount) => {
  let randomBlock = objects.ice * blockcount;
  return randomBlock;
};

const generate2d = (n, m) => { // random array generátort implementáltuk 2Dre ===> nem kell külön a random arrayt használni
  let arr = new Array(n);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(m);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = randomMap(blockcount);
    }
  }
  return arr;
};

console.log(generate2d(15,13));

