const StateSchema = require('../../model/State');
const sassieDb = require('../../sassie/sassieDb');

function initializeState(obj, fail, initialized) {
    var newState = {};
    
    newState.id = sassieDb.getId(obj);
    newState.gameId = sassieDb.getGameId();
    newState.state = obj;
    newState.actions = sassieDb.getActionWeights(obj.actions);
    
    initialized(new StateSchema(newState));
}

module.exports = {
    initializeState: initializeState
};