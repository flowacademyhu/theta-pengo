const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

const keyPressProcessor = () => {
  stdin.on('data', (key) => {
    if (key === 'w') {
      movePlayer(player, 'up', matrix);
    }
    if (key === 's') {
      movePlayer(player, 'down', matrix);
    }
    if (key === 'a') {
      movePlayer(player, 'left', matrix);
    }
    if (key === 'd') {
      movePlayer(player, 'right', matrix);
    }
    if (key === 'k') {
      //  pushIce(player.direction, matrix);
    }
    if (key === 'l') {
      destroyIce(player, matrix);
    }
    if (key === 'q') {
      process.exit(0);
    }
  }
  );
};
module.exports = { keyPressProcessor };
