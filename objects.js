const chalk = require('chalk');
const floor = { type: 'floor', code: 0, symbol: chalk.blackBright(' ') };
const ice = { type: 'ice', code: 1, symbol: chalk.cyan('◪') };
const enemy = { type: 'enemy', code: 'A', symbol: chalk.red('◍'), xCoord: 0, yCoord: 0, isSliding: false, direction: 'up' };
const player = { type: 'player', code: 'P', symbol: chalk.magentaBright('◈'), direction: 'up', xCoord: 0, yCoord: 0 };
const wall = { type: 'wall', code: 'X', symbol: chalk.blue('▩') };
const slidingBlock = { type: 'slidingBlock', code: 'S', symbol: chalk.cyanBright('◪'), direction: 'up', didItSlide: false };

module.exports = { floor, ice, enemy, player, wall, slidingBlock };
