import axios from 'axios';
const BASE_URL = 'https://bad-api-assignment.reaktor.com';

const handler = async (req, res) => {
  console.log(req.query);
  const result = await getHistory(
    [],
    req.query.cursor ? req.query.cursor : undefined,
    req.query.limit ? req.query.limit : undefined
  );
  res.status(200).json(result);
};

const getHistory = async (history = [], cursor = undefined, limit = 1000) => {
  if (!cursor && history.length === 0) {
    const result = await axios.get(`${BASE_URL}/rps/history`);
    history = [...result.data.data];
    return getHistory(history, result.data.cursor, limit);
  }
  if (cursor) {
    const result = await axios.get(`${BASE_URL}${cursor}`);
    console.log('next iter');
    console.log(result.data.cursor);
    history = [...history, ...result.data.data];
    console.log(history.length);

    if (history.length > limit) {
      return { data: history, cursor: result.data.cursor };
    }
    return getHistory(history, result.data.cursor, limit);
  }
};

// const filterGames = (games, player) => {
//   return games.filter(game => game.playerA.name === player || game.playerB.name === player)
// }

export default handler;
