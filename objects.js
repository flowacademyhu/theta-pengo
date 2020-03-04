let floor = { type: 'floor', code: 0, symbol: ' ' };
let ice = { type: 'ice', code: 1, symbol: 'J' };
let enemy = { type: 'enemy', code: 'A', symbol: '@', direction: 'up', xCoord: 0, yCoord: 0 };
let player = { type: 'player', code: 'P', symbol: 'P', direction: 'up', xCoord: 0, yCoord: 0 };
let wall = { type: 'wall', code: 'X', symbol: '[]' };
module.exports = { floor, ice, enemy, player, wall };
