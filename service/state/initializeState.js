const StateSchema = require('../../model/State');
const sassieDb = require('../../sassie/db/db');

function initializeState(obj, fail, initialized) {
    var newState = {};
    
    //This might look odd, but it's called currying and is a functional principle
    sassieDb.getId(obj, function(id) {
        sassieDb.getGameId(function(gameId){
            sassieDb.getActionWeights(obj.actions, function(actions){
                createState(id, gameId, obj, actions, initialized);
            })
        })
    });

    function createState(id, gameId, state, actions, created){
        var newState = {};

        newState.id = id;
        newState.gameId = gameId;
        newState.state = state;
        newState.actions = actions;

        created(new StateSchema(newState))
    }
}

module.exports = {
    initializeState: initializeState
};