const StateSchema = require('../../model/State');
const sassieDb = require('../../sassie/db/db');
const utils = require('./isInitialized');
const stateInitializer = require('./initializeState');

function saveState(obj, fail, saved){
    utils.isInitialized(
        obj, 
        is,
        isnt
    );

    function is(){
        saved(obj)
    };

    function isnt(){
        stateInitializer.initializeState(obj, fail, initialized);
    }

    function initialized(state) {
        state.save(fail);
        saved(state);
    }
};


module.exports = {
    saveState: saveState
};