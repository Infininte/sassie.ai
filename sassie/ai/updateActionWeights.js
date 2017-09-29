const action = require('../../service/action/action')

function updateActionWeights(actions, actionChosen, fail, updated){
    var step = 1;

    action.hasAction(actions, actionChosen, does, doesNot);

    function does(foundAction){
        updateWeight(
            foundAction,
            1,
            fail,
            updated)
    }

    function doesNot() {
        fail("Chosen action is not in the available action list");
    }

    function updateWeight(action, step, fail, updated){
        var newAction = Object.assign({}, action);
        newAction.weight += step;
        
        updated(newAction)
    }
}


module.exports = {
    updateActionWeights: updateActionWeights
};


    //This problem is essentially many, many instances of one problem
    //A normal AI problem contains many data points at once and many 
    //  different data points.
    //My problem can be reduced to many different AI problems by realizing
    //  that each unique state of a game is a single AI problem. The
    //  different data points do not exist at once, but are spread out
    //  over time, as the state appears in different games.

    //This is a fairly simple solution. The weight will be a non-reduced 
    //  value that will be pushed through a quantizer function to get the 
    //  weighted value for the decision.

    //The problem I'm facing is fairly unique. Most AI problems involve
    //  many quantified features that are pushed through a net input
    //  function and a quantizer/step function to get the weighted
    //  value. My problem only has one feature 'win', which can have 
    //  multiple values between 0 and 1. 0 is loss, 1 is win, 0.5 is
    //  draw, and values in-between can represent less-bad or less-good
    //  wins and failures. I may use a scale of -1 to 1, but I'm not sure
    //  that will matter greatly.

    //The way I'm setting up this AI is interesting. Each state is a
    //  seperate problem that, to the point that it's like I'm trying
    //  to create an AI to classify plants within any species of 
    //  flower. It's a huge problem that I'm simplifying by ignoring
    //  individual feature values. I take all the information and say
    //  "knowing all this data, there's only one possible action that
    //  I should take." If I knew every possible thing about that flower,
    //  there should be only one correct solution to classify this as.
    //  I'm simplifying this AI problem, not by reducing the feature
    //  set, but by ignoring the quantitative values for each feature.
    //  e.g. I treat each different set and value of features differently
    //  like it's own unique problem with it's own unique weights.
    //Overwhelming? Yes. That's why I won't stop there. I plan to use
    //  feature reduction to create multiple, useful general cases.
    //  those general cases will then become features in my decisions
    //  on a single state.
    //  e.g. In a general situation, you'd make a certain choice. I'll
    //  use the weighting from that general situation to aid in weighting
    //  a specific situation.
    //  This solves my overwhelming problem. By using general situations,
    //  I'm able to reduce the set of different states greatly and at the
    //  same time, I allow for specific circumstances to help make my
    //  decisions.
    //  e.g. In Magic the gathering, you'd normally use a really big 
    //  creature to kill a little creature. However, if the little 
    //  creature has death touch, it will kill your big creature if
    //  it's attacked. The best decision for this specific situation
    //  (attacking a creature with death touch) should outweigh the 
    //  more general best decision of attacking a smaller creature 
    //  with a bigger creature. 