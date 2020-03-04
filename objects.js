let floor = { type: 'floor', code: 0, symbol: ' ' };
let ice = { type: 'iceblock', code: 1, symbol: 'J' };
let enemy1 = { type: 'enemy', code: 'A', symbol: '@', direction: 'up', xCoord: 0, yCoord: 0 };
let enemy2 = { type: 'enemy', code: 'B', symbol: '@', direction: 'up', xCoord: 0, yCoord: 0 };
let enemy3 = { type: 'enemy', code: 'C', symbol: '@', direction: 'up', xCoord: 0, yCoord: 0 };
let player = { type: 'player', code: 'P', symbol: 'P', direction: 'up', xCoord: 0, yCoord: 0 };
let wall = { type: 'wall', code: 'X', symbol: '[]' };
module.exports = { floor, ice, enemy1, enemy2, enemy3, player, wall };
