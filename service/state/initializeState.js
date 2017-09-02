const StateSchema = require('../../model/State');
const sassie = require('../../sassie/sassie');

function initializeState(obj, fail, initialized) {
    var newState = {};
    
    //This might look odd, but it's called currying and is a functional principle
    sassie.db.getId(obj, fail, function(id) {
        sassie.db.getGameId(fail, function(gameId){
            sassie.ai.generateActionWeights(obj.actions, fail, function(actions){
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