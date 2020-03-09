let floor = { type: 'floor', code: 0, symbol: ' ' };
let ice = { type: 'ice', code: 1, symbol: 'J' };
let enemy = { type: 'enemy', code: 'A', symbol: '@', xCoord: 0, yCoord: 0, isSliding: false };
let player = { type: 'player', code: 'P', symbol: 'P', direction: 'up', xCoord: 0, yCoord: 0 };
let wall = { type: 'wall', code: 'X', symbol: '[]' };
let slidingBlock = { type: 'slidingBlock', code: 'S', symbol: 'S', direction: 'up', didItSlide: false };
let blood = { type: 'blood', code: 'x', symbol: 'x' };
module.exports = { floor, ice, enemy, player, wall, slidingBlock, blood };
