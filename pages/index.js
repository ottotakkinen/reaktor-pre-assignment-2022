import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [history, setHistory] = useState({});
  const [player, setPlayer] = useState('');

  const getHistory = async () => {
    const result = await axios.get(`${window.location.origin}/api/history`);
    setHistory({ data: result.data.data, cursor: result.data.cursor });
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
      <header>
        <h1>Rock Paper Scissors</h1>
      </header>
      <main>
        <section>
          <h2>Player search</h2>
          <input type="text" onChange={(e) => setPlayer(e.target.value)} />
          <button onClick={getHistory}>Get history</button>
          {history.data && (
            <div>
              <button onClick={getMoreHistory}>Load more</button>
              <p>In the last {history.data.length} games:</p>
              <p>
                {player} played{' '}
                {
                  history?.data?.filter(
                    (game) =>
                      game.playerA.name === player ||
                      game.playerB.name === player
                  ).length
                }{' '}
                games.
              </p>
            </div>
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
        </section>
      </main>
    </React.Fragment>
  );
};

export default App;
