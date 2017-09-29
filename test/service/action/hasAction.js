const assert = require('assert');
const sinon = require('sinon');
const actionChecker = require('../../../service/action/hasAction');

// before(function() {
// });

var actions, chosenAction, does, doesNot;

describe('hasActions', function(){

    beforeEach(function() {
        actions = [
            { action: "fly you fools!", weight: 0}
        ];
        chosenAction = "fly you fools!";
        does = sinon.spy();
        doesNot = sinon.spy();
    });

    it('should call success function if the list has the appropriate action', function(){
        actionChecker.hasAction(actions, chosenAction, does, doesNot);

        assert.equal(does.called, true, "The does method was not called");
    });

    it('should call fail function if the list does not have the appropriate action', function(){
        actionChecker.hasAction(actions, "You fool of a Took", does, doesNot);

        assert.equal(doesNot.called, true, "The doesNot method was not called");
    });

});