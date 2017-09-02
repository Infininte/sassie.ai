const actionChooser = require('./chooseAction');
const actionWeightGenerator = require('./generateActionWeights');
const actionWeightUpdater = require('./updateActionWeights');

module.exports = Object.assign(
    {},
    actionChooser,
    actionWeightGenerator,
    actionWeightUpdater
)