const stateFinder = require('./findState');
const stateSaver = require('./saveState');

function getState(state, fail, got){
    stateFinder.findState(
        state,
        fail,
        found,
        notFound
    )

    function found(state) {
        got(state);
    }

    function notFound() {
        stateSaver.saveState(state, fail, got)
    }
}

module.exports = {
    getState: getState
};