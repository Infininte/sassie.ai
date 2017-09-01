function getActionWeights(actions, got){
    got(actions.map(a => {
        return {action: a, weight: Math.random()}
    }));
}

module.exports = {
    getActionWeights: getActionWeights
};