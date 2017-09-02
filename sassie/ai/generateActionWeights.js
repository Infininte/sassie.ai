function generateActionWeights(actions, fail, got){
    got(actions.map(a => {
        return {action: a, weight: Math.random()}
    }));
}

module.exports = {
    generateActionWeights: generateActionWeights
};