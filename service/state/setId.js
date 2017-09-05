const sassie = require('../../sassie/sassie');

function setId(newState, state, fail, set) {

    sassie.db.getId(state, fail, got);
    
    function got(id){
        set(Object.assign(newState, {id: id}));
    }

}

module.exports = {
    setId: setId
};