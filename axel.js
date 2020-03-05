// Uses AXEL's node module
var ctx = require('../index.js');

/*
// Clear the terminal
ctx.clear();

// Sets the pixel BG color to green
ctx.bg(0, 255, 0);

// Draws a line into the console
ctx.line(1, 1, 10, 10);

// Red box
ctx.bg(255, 0, 0);
ctx.box(2, 2, 8, 4);

// Yellow box
ctx.bg(255, 255, 0);
ctx.box(12, 2, 8, 4);

// Green box
ctx.bg(0, 255, 0);
ctx.box(2, 7, 8, 4);

// Blue box
ctx.bg(0, 0, 255);
ctx.box(12, 7, 8, 4);

ctx.cursor.restore();

// Clear the terminal/screen/console
ctx.clear();

// "Brush" refers to a "character-brush"
// Every time a pixel is drawn in a line for example,
// the foreground color and the brush can be used to
// add texture/detail to the pixel.
 */
// var brushes = ' ░▒▓█';

// function nextBrush (n) {
//   return brushes[parseInt(n % brushes.length)];
// }
// ctx.bg(128, 128, 128);
// // Draw some lines which step through the brush characters
// if ()
//   ctx.brush = nextBrush(y);

//   // Each line is now draw with the specified
//   // character in each pixel
//   ctx.line(1, y, ctx.cols, y);
// }

// ctx.clear();

// Clear the terminal/screen/console
ctx.clear();

// Background to red, foreground to white
ctx.bg(255, 0, 0);
ctx.fg(255, 255, 255);
ctx.text(5, 1, ' WHITE ON RED! ');

// Background to yellow, foreground to black
ctx.bg(255, 255, 0);
ctx.fg(0, 0, 0);
ctx.text(10, 2, ' BLACK ON YELLOW! ');

// Position the cursor at the end of the console
// so as not to draw over the bottom of the circle
ctx.cursor.restore();
