const floor = { type: 'floor', code: 0, symbol: ' ' };
const ice = { type: 'iceblock', code: 1, symbol: 'J' };
const enemy = { type: 'enemy', code: 2, symbol: '@' };
const player = { type: 'player', code: 3, symbol: 'P', direction: 'up', xCoord: 0, yCoord: 0 };
module.exports = { floor, ice, enemy, player };
