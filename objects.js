const floor = { type: 'floor', code: 0, symbol: ' ' };
const ice = { type: 'ice', code: 1, symbol: 'J' };
const enemy = { type: 'enemy', code: 'A', symbol: '@', direction: 'up', xCoord: 0, yCoord: 0 };
const player = { type: 'player', code: 'P', symbol: 'P', direction: 'up', xCoord: 0, yCoord: 0 };
const wall = { type: 'wall', code: 'X', symbol: '[]' };
module.exports = { floor, ice, enemy, player, wall };
