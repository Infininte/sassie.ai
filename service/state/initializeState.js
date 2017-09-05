const StateSchema = require('../../model/State');
const sassie = require('../../sassie/sassie');
const idSetter = require('./setId');
const gameIdSetter = require('./setGameId');
const stateSetter = require('./setState');
const actionsSetter = require('./setActions');

function initializeState(obj, fail, initialized) {
    
    //This might look odd, but it's called currying and is a functional principle
    idSetter.setId({}, obj, fail, function(state){
        gameIdSetter.setGameId(state, fail, function(state){
            stateSetter.setState(state, obj, fail, function(state){
                actionsSetter.setActions(state, obj.actions, fail, initialized);
            });
        });
    });
}

module.exports = {
    initializeState: initializeState
};