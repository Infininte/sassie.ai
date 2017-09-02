const idGetter = require('./getId');
const gameIdGetter = require('./getGameId');

module.exports = Object.assign(
    {},
    idGetter,
    gameIdGetter
);