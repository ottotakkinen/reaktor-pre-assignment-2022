import React, { useState } from 'react';
import axios from 'axios';

import PlayerStats from '../components/PlayerStats';
import LiveGames from '../components/LiveGames';

import styles from '../styles/Home.module.css';

const Home = () => {
  const [history, setHistory] = useState({});
  const [player, setPlayer] = useState('');
  const [playerInput, setPlayerInput] = useState();

  const getHistory = async (e) => {
    e.preventDefault();
    setPlayer(playerInput ? playerInput : 'Ukko Järvinen');
    if (!history.data) {
      const result = await axios.get(`${window.location.origin}/api/history`);
      setHistory({ data: result.data.data, cursor: result.data.cursor });
    }
  };

  const getMoreHistory = async () => {
    const result = await axios.get(
      `${window.location.origin}/api/history?cursor=${history.cursor}`
    );
    console.log(history);
    console.log(result.data);
    setHistory((prev) => ({
      data: [...prev.data, ...result.data.data],
      cursor: result.data.cursor,
    }));
  };

  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Rock Paper Scissors</h1>
      </header>
      <main>
        <section>
          <h2>Player search</h2>
          <form>
            <input
              type="text"
              onChange={(e) => setPlayerInput(e.target.value)}
              value={player ? player : 'Ukko Järvinen'}
            />
            <button type="submit" onClick={getHistory}>
              Search
            </button>
          </form>

          {history.data && (
            <PlayerStats
              games={history.data}
              player={player}
              getMoreHistory={getMoreHistory}
            />
          )}
          {/* {history?.data
            ?.filter(
              (game) =>
                game.playerA.name === player || game.playerB.name === player
            )
            .map((game) => (
              <p key={game.gameId}>{game.gameId}</p>
            ))} */}
        </section>
        <section>
          <h2>Live games</h2>
          <LiveGames />
        </section>
      </main>
    </React.Fragment>
  );
};

export default Home;
