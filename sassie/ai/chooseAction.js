function chooseAction(actions, fail, chosen){
    chosen(choose());
    
    function choose() {
        return actions.reduce((a, b) => {
            if(a.weight >= b.weight) return a;
            return b;
        }).action;
    }
}

module.exports = {
    chooseAction: chooseAction
}