import getWinner from './getWinner';

const getWinRate = (games, player) => {
  return (
    Math.floor(
      (games.reduce((sum, game) => {
        const winner = getWinner(game);
        if (winner === player) {
          return sum + 1;
        } else {
          return sum;
        }
      }, 0) /
        games.filter(
          (game) => game.playerA.name === player || game.playerB.name === player
        ).length) *
        10000
    ) / 100
  );
};

export default getWinRate;
