const getPlayedCount = (games, player) => {
  return games.filter(
    (game) => game.playerA.name === player || game.playerB.name === player
  ).length;
};

export default getPlayedCount;
