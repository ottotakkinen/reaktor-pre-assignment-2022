const getMostPlayed = (games, player) => {
  const playedArray = [];

  games.forEach((game) => {
    if (game.playerA.name === player) {
      playedArray.push(game.playerA.played);
    }
    if (game.playerB.name === player) {
      playedArray.push(game.playerB.played);
    }
  });

  const mostPlayed = mode(playedArray);
  return mostPlayed;
};

// Most occurring item in array from https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
function mode(array) {
  if (array.length == 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

export default getMostPlayed;
