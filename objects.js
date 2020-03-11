let floor = { type: 'floor', code: 0, symbol: ' ' };
let ice = { type: 'ice', code: 1, symbol: ('◪') };
let enemy = { type: 'enemy', code: 'A', symbol: '◯', xCoord: 0, yCoord: 0, isSliding: false, direction: 'up' };
let player = { type: 'player', code: 'P', symbol: '◈', direction: 'up', xCoord: 0, yCoord: 0 };
let wall = { type: 'wall', code: 'X', symbol: '▩' };
let slidingBlock = { type: 'slidingBlock', code: 'S', symbol: '◪', direction: 'up', didItSlide: false };
module.exports = { floor, ice, enemy, player, wall, slidingBlock };
