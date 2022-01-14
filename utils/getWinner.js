const getWinner = (game) => {
  const a = game.playerA.played;
  const b = game.playerB.played;
  if (a === b) {
    return 'tie';
  }
  if (
    (a === 'ROCK' && b === 'SCISSORS') ||
    (a === 'SCISSORS' && b === 'PAPER') ||
    (a === 'PAPER' && b === 'ROCK')
  ) {
    return 'A';
  } else {
    return 'B';
  }
};

export default getWinner;
