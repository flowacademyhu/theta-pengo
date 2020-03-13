const chalk = require('chalk');
const floor = { type: 'floor', code: 0, symbol: ' ' };
const ice = { type: 'ice', code: 1, symbol: chalk.blue('◪') };
const enemy = { type: 'enemy', code: 'A', symbol: chalk.yellow('◯'), x: 0, y: 0, isSliding: false, direction: 'up' };
const player = { type: 'player', code: 'P', symbol: chalk.redBright('◈'), direction: 'up', x: 0, y: 0, lives: 0, score: 0 };
const wall = { type: 'wall', code: 'X', symbol: chalk.grey('▩') };
const slidingBlock = { type: 'slidingBlock', code: 'S', symbol: chalk.blue('◪'), direction: 'up', didItSlide: false };
module.exports = { floor, ice, enemy, player, wall, slidingBlock };
