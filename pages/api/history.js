import axios from 'axios';
const BASE_URL = 'https://bad-api-assignment.reaktor.com';

const test_player = 'Ukko Järvinen';

const handler = async (req, res) => {
  const result = await getHistory(
    [],
    req.query.cursor ? req.query.cursor : undefined
  );
  console.log(result.data.length);
  console.log(result.cursor);
  res.status(200).json(result);
};

const getHistory = async (history = [], cursor = undefined) => {
  if (!cursor && history.length === 0) {
    const result = await axios.get(`${BASE_URL}/rps/history`);
    history = [...result.data.data];
    // console.log(result.data.cursor);
    return getHistory(history, result.data.cursor);
  }
  if (cursor) {
    const result = await axios.get(`${BASE_URL}${cursor}`);
    console.log('next iter');
    console.log(result.data.cursor);
    history = [...history, ...result.data.data];
    console.log(history.length);

    if (history.length > 2000) {
      return { data: history, cursor: result.data.cursor };
    }
    return getHistory(history, result.data.cursor);
  }
};

// const filterGames = (games, player) => {
//   return games.filter(game => game.playerA.name === player || game.playerB.name === player)
// }

export default handler;
