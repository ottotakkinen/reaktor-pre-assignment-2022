import React from 'react';

import getWinner from '../utils/getWinner';
import getMostPlayed from '../utils/getMostPlayed';

const PlayerStats = ({ games, player, getMoreHistory }) => {
  return (
    <div>
      <button onClick={getMoreHistory}>Load more</button>
      <p>In the last {games.length} games:</p>
      <p>
        {player} played{' '}
        {
          games.filter(
            (game) =>
              game.playerA.name === player || game.playerB.name === player
          ).length
        }{' '}
        games.
      </p>
      <p>
        Winrate:{' '}
        {`${
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
                (game) =>
                  game.playerA.name === player || game.playerB.name === player
              ).length) *
              10000
          ) / 100
        }%`}
      </p>
      <p>Most played: {getMostPlayed(games, player)}</p>
    </div>
  );
};

export default PlayerStats;
