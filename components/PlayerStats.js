import React, { useState, useEffect } from 'react';

import getMostPlayed from '../utils/getMostPlayed.js';
import getWinRate from '../utils/getWinrate.js';
import getPlayedCount from '../utils/getPlayedCount.js';

import styles from '../styles/PlayerStats.module.css';
import Spinner from './Spinner.js';

const PlayerStats = ({ games, player, getMoreHistory }) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [loading, setLoading] = useState(undefined);

  useEffect(() => {
    setMaxHeight(1000);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [games]);

  if (!games) {
    setLoading(false);
    return '';
  }

  const handleButton = () => {
    setLoading(true);
    getMoreHistory();
  };

  const playedCount = getPlayedCount(games, player);

  return (
    <div className={styles.main} style={{ maxHeight: `${maxHeight}px` }}>
      <h3>{player}</h3>
      <span>In the last {games.length} games</span>
      {loading ? (
        <Spinner />
      ) : (
        <button className={styles.button} onClick={handleButton}>
          Load more
        </button>
      )}
      {playedCount > 0 ? (
        <div className={styles.statCardContainer}>
          <div className={styles.statCard}>
            <p>Played</p>
            <p className={styles.highlight}>{playedCount}</p>
          </div>
          <div className={styles.statCard}>
            <p>Winrate</p>
            <p className={styles.highlight}>{`${getWinRate(
              games,
              player
            )}%`}</p>
          </div>
          <div className={styles.statCard}>
            <p>Most played</p>
            <p className={styles.highlight}>{getMostPlayed(games, player)}</p>
          </div>
        </div>
      ) : (
        <p>No games found.</p>
      )}
    </div>
  );
};

export default PlayerStats;
