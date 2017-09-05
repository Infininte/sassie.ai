function setState(newState, state, fail, set) {

    set(Object.assign(newState, {state: state}));
}

module.exports = {
    setState: setState
};