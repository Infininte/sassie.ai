const hashjs = require('hash.js');
const gameState = require('./gameState');

function getId(state){
    return hashjs.sha512().update(JSON.stringify(state)).digest('hex');
}

function getGameId(){
    return hashjs.sha512().update( (new Date()).getTime() ).digest('hex');
}

function save(state, schema, callback){
    var adaState = initAdaState(state);

    var newAdaState = new schema(adaState);
    newAdaState.save(callback);
}

function find(state, schema, callback){
    var thisErr, thisNewState;
    if(state.id) callback([[], thisNewState]);

    schema.findOne({id: getId(state)}).exec(callback);
}

function initAdaState(state){
    var adaState = gameState.object;

    //This is the only value that the client should know about that we don't want on the state
    if(!state.gameId){
        adaState.gameId = getGameId();
    }else{
        adaState.gameId = state.gameId;
        delete state.gameId;
    }
    
    adaState.id = getId(state);
    adaState.state = state;

    if(!state.actions) throw new Error("I need actions to act on!");

    adaState.actions = getActionWeights(state.actions);
    adaState.actionTaken = state.actionTaken;
    adaState.players = state.players;
    adaState.currenPlayer = state.currenPlayer;
    adaState.winner = state.winner;

    return adaState;
}

function getActionWeights(actions){
    return actions.map(a => {
        return {action: a, weight: 0.5}
    });
}

function getActionWeight(){

}

db = {
    save: save,
    find: find
};

module.exports = db;