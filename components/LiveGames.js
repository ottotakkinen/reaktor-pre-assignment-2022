import React, { useEffect, useState } from 'react';

const WS_URL = 'wss://bad-api-assignment.reaktor.com/rps/live';

const MOCK_GAME = {
  type: 'GAME_RESULT',
  gameId: 'cd49363e5a79abdcab1',
  t: 1642151764852,
  playerA: { name: 'Sampo Hämäläinen', played: 'SCISSORS' },
  playerB: { name: 'Sampo Järvinen', played: 'PAPER' },
};

const LiveGames = () => {
  const [games, setGames] = useState([MOCK_GAME]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = (event) => {
      console.log('WebSocket is open now.');
    };

    ws.onmessage = (event) => {
      const gameData = JSON.parse(JSON.parse(event.data));
      if (gameData.type === 'GAME_BEGIN') {
        console.log('Game begins', gameData.gameId);
        setGames((prev) => [...prev, gameData]);
      }
      if (gameData.type === 'GAME_RESULT') {
        console.log('Game result', gameData.gameId);

        setGames((prev) =>
          prev.map((game) =>
            game.gameId === gameData.gameId ? gameData : game
          )
        );
        // setInterval(() => {
        //   setGames((prev) =>
        //     prev.filter((game) => game.gameId !== gameData.gameId)
        //   );
        // }, 5000);
      }
    };
  }, []);
  return (
    <div>
      {games.map((game) => (
        <div key={game.gameId}>
          <span>{game.playerA.name}</span>
          <span>{game.playerA?.played ? game.playerA.played : 'Loader'}</span>
          <span>vs</span>
          <span>{game.playerB?.played ? game.playerB.played : 'Loader'}</span>
          <span>{game.playerB.name}</span>
        </div>
      ))}
    </div>
  );
};

export default LiveGames;
