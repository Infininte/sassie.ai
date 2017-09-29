function hasAction(actions, actionChosen, does, doesNot){
    var foundAction = actions.find((action) => action.action === actionChosen);
    if(foundAction){
        does(foundAction);
    }else{
        doesNot();
    }
}

module.exports = {
    hasAction: hasAction
};