const sassie = require('../../sassie/sassie');

function setActions(newState, actions, fail, set) {

    sassie.ai.generateActionWeights(actions, fail, got);
    
    function got(generatedActions){
        set(Object.assign(newState, {actions: generatedActions}));
    }

}

module.exports = {
    setActions: setActions
};