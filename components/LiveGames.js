import React, { useEffect, useState } from 'react';

import styles from '../styles/LiveGames.module.css';
import Spinner from './Spinner';

const WS_URL = 'wss://bad-api-assignment.reaktor.com/rps/live';

// const MOCK_GAME = {
//   type: 'GAME_RESULT',
//   gameId: 'cd49363e5a79abdcab1',
//   t: 1642151764852,
//   playerA: { name: 'Sampo Hämäläinen', played: 'SCISSORS' },
//   playerB: { name: 'Sampo Järvinen', played: 'PAPER' },
// };

const LiveGames = ({ setPlayer }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = (event) => {
      // console.log('WebSocket is open now.');
    };

    ws.onmessage = (event) => {
      const gameData = JSON.parse(JSON.parse(event.data));
      if (gameData.type === 'GAME_BEGIN') {
        setGames((prev) => [...prev, gameData]);
      }
      if (gameData.type === 'GAME_RESULT') {
        setGames((prev) =>
          prev.map((game) =>
            game.gameId === gameData.gameId ? gameData : game
          )
        );
        setInterval(() => {
          setGames((prev) =>
            prev.filter((game) => game.gameId !== gameData.gameId)
          );
        }, 5000);
      }
    };
  }, []);
  return (
    <React.Fragment>
      {games.map((game) => (
        <div className={styles.card} key={game.gameId}>
          <span
            className={styles.playerName}
            tabIndex="0"
            onClick={() => setPlayer(game.playerA.name)}
          >
            {game.playerA.name}
          </span>

          {game.playerA?.played ? (
            <span>{game.playerA.played}</span>
          ) : (
            <Spinner />
          )}

          <span>vs</span>
          {game.playerB?.played ? (
            <span>{game.playerB.played}</span>
          ) : (
            <Spinner />
          )}
          <span
            className={styles.playerName}
            tabIndex="0"
            onClick={() => setPlayer(game.playerB.name)}
          >
            {game.playerB.name}
          </span>
        </div>
      ))}
    </React.Fragment>
  );
};

export default LiveGames;
