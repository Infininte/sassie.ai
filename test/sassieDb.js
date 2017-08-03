var assert = require('assert');
var adadb = require('../sassie/sassieDb');
const mongoose = require('mongoose');

var db;

before(function() {
    mongoose.connect('mongodb://localhost/test');
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("We're connected!")
    });
})

describe('save', function() {

    var schema, model, stateObj;

    beforeEach(function() {
        stateObj = {actions: ["Action"]}
        schema = mongoose.Schema(stateObj);
        model = db.model('State', schema);
    });

    it('should call callback', function() {
        var callBackCalled = false;
        function callback(){
            callBackCalled = true;
        }

        adadb.save(stateObj, model, callback);
        assert.equal(callBackCalled, true, "Callback was not called from save");
    });
});