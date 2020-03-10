const floor = { type: 'floor', code: 0, symbol: ' ' };
const ice = { type: 'ice', code: 1, symbol: 'J' };
const enemy = { type: 'enemy', code: 'A', symbol: '@', xCoord: 0, yCoord: 0, isSliding: false, direction: 'up' };
const player = { type: 'player', code: 'P', symbol: 'P', direction: 'up', xCoord: 0, yCoord: 0 };
const wall = { type: 'wall', code: 'X', symbol: '[]' };
const slidingBlock = { type: 'slidingBlock', code: 'S', symbol: 'S', direction: 'up', didItSlide: false };
module.exports = { floor, ice, enemy, player, wall, slidingBlock };
