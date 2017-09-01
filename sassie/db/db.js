const idGetter = require('./getId');
const gameIdGetter = require('./getGameId');
const actionWeightGetter = require('./getActionWeights');

module.exports = Object.assign(
    {},
    idGetter,
    gameIdGetter,
    actionWeightGetter
);