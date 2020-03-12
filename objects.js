const chalk = require('chalk');
const floor = { type: 'floor', code: 0, symbol: (' ') };
const ice = { type: 'ice', code: 1, symbol: chalk.blue('❑') };
const enemy = { type: 'enemy', code: 'A', symbol: chalk.yellow('◍'), xCoord: 0, yCoord: 0, isSliding: false, direction: 'up' };
const player = { type: 'player', code: 'P', symbol: chalk.whiteBright('◈'), direction: 'up', xCoord: 0, yCoord: 0 };
const wall = { type: 'wall', code: 'X', symbol: chalk.cyan('▩') };
const slidingBlock = { type: 'slidingBlock', code: 'S', symbol: chalk.cyanBright('❑'), direction: 'up', didItSlide: false };
module.exports = { floor, ice, enemy, player, wall, slidingBlock };
