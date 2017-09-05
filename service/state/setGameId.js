const sassie = require('../../sassie/sassie');

function setGameId(newState, fail, set) {

    sassie.db.getGameId(state, fail, got);
    
    function got(gameId){
        set(Object.assign(newState, {gameId: gameId}));
    }

}

module.exports = {
    setGameId: setGameId
};