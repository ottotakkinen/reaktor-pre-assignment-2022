import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PlayerStats from '../components/PlayerStats';
import LiveGames from '../components/LiveGames';

import styles from '../styles/Home.module.css';

const Home = () => {
  const [history, setHistory] = useState({});
  const [player, setPlayer] = useState('');
  const [playerInput, setPlayerInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayer(playerInput);
  };

  useEffect(() => {
    const getHistory = async () => {
      if (!history.data) {
        const result = await axios.get(`${window.location.origin}/api/history`);
        setHistory({ data: result.data.data, cursor: result.data.cursor });
      }
    };
    getHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  const getMoreHistory = async () => {
    const result = await axios.get(
      `${window.location.origin}/api/history?cursor=${history.cursor}&limit=5000`
    );
    setHistory((prev) => ({
      data: [...prev.data, ...result.data.data],
      cursor: result.data.cursor,
    }));
  };

  const handleLiveGameLinks = (player) => {
    setPlayer(player);
    setPlayerInput(player);
  };

  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Rock Paper Scissors</h1>
      </header>
      <main>
        <section className={styles.search}>
          <div className={styles.searchContainer}>
            <h2>Player search</h2>
            <form className={styles.searchForm}>
              <input
                type="text"
                onChange={(e) => setPlayerInput(e.target.value)}
                value={playerInput}
              />
              <button type="submit" onClick={handleSubmit}>
                Search
              </button>
            </form>
            {player && (
              <PlayerStats
                games={history.data}
                player={player}
                getMoreHistory={getMoreHistory}
              />
            )}
          </div>
        </section>
        <section className={styles.live}>
          <h2>Live games</h2>
          <LiveGames setPlayer={handleLiveGameLinks} />
        </section>
      </main>
    </React.Fragment>
  );
};

export default Home;
