const fs = require('fs');
const readline = require('readline');

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

const askForName = (score) => {
  console.log('pontszámod: ' + score);
  const readlineSync = require('readline-sync');
  let name = readlineSync.question('Hogy hívnak? \n');
  return name;
};

const init = (score) => {
  let name = askForName(score);
  writeScoreToFile(score, name);
  console.log('Pontszámok: ');
  console.log(readFromFile());
};
module.exports = { init };
