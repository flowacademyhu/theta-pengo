const fs = require('fs');
const readline = require('readline');
const table = require('table');

/*const readLineInterface = readline.createInterface({
  input: fs.createReadStream('scores.txt'),
  output: process.stdout,
  console: false
});*/

const writeScoreToFile = (score, name) => {
  fs.appendFileSync('scores.txt', `${score}: ${name}\n`, function (err) {
    if (err) throw err;
  });
};

const readFromFile = () => {
  const dataFromFile = fs.readFileSync('scores.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    return data;
  });
  return dataFromFile;
};

const modifyDataFromFile = (dataFromFile) => {
  let howManyLines = 10;
  let data = dataFromFile.split('\n');
  let splitData = new Array(data.length - 1);
  for (let i = 0; i < data.length - 1; i++) {
    splitData[i] = data[i].split(':');
  }
  splitData.sort(function (a, b) { return b[0] - a[0]; }); // Sort the numbers in the array in descending order
  for (let i = 0; i < howManyLines; i++) {
    splitData[i] = splitData[i].join(':');
  }
  let returnData = new Array(howManyLines);
  for (let i = 0; i < howManyLines; i++) {
    returnData[i] = splitData[i];
  }
  return returnData;
};

const askForName = (score) => {
  console.log('pontszámod: ' + score);
  const readlineSync = require('readline-sync');
  let name = readlineSync.question('Hogy hívnak? \n');
  return name;
};

const printScores = (data) => {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
  }
};

const init = (score) => {
  const name = askForName(score);
  writeScoreToFile(score, name);
  console.log('Pontszámok: ');
  printScores(modifyDataFromFile(readFromFile()));
};

module.exports = { init };
