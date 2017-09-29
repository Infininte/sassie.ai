const assert = require('assert');
const sinon = require('sinon');
const actionWeightUpdater = require('../../../sassie/ai/updateActionWeights');

// before(function() {
// });

var actions, chosenAction, failed, updated;

describe('updateActionWeights', function(){

    beforeEach(function() {
        actions = [
            { action: "fly you fools!", weight: 0}
        ];
        chosenAction = "fly you fools!";
        updated = sinon.spy();
        failed = sinon.spy();
    });

    it('should update a weight', function(){
        actionWeightUpdater.updateActionWeights(actions, chosenAction, failed, updated);

        sinon.assert.notCalled(failed);
        sinon.assert.calledOnce(updated);
        sinon.assert.calledWith(updated, sinon.match({action: chosenAction, weight: 1}));
    });

    it('should not update a weight, if it is not in the list', function(){
        actionWeightUpdater.updateActionWeights(actions, 'You fool of a Took!', failed, updated);

        sinon.assert.calledOnce(failed);
        sinon.assert.calledWith(failed, sinon.match.string);
    });

});