function chooseAction(actions){
    return actions.reduce((a, b) => {
        if(a.weight >= b.weight) return a;
        return b;
    }).action;
}

function weightActions(gameId, schema) {
    console.log("Actions weighted!");
}

function getGameMultiplier(winOrLoss){
    if(winOrLoss == 'win') return 1;
    return -1;
}

ada = {
    weightActions: weightActions,
    chooseAction: chooseAction
}

module.exports = ada;