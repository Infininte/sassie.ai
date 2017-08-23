const mongoose = require('mongoose');
const sassieDb = require('../sassie/sassieDb');
var Schema = mongoose.Schema;

StateSchema = new Schema({
    id:      { type: String, index: true, unique: true, required: true },
    gameId:  { type: String, index: true, required: true },
    state:   { type: Object, required: true },
    actions: { type: [{
            action: { type: String, required: true },
            weight: { type: Number, required: true }
        }], required: true },
    actionTaken: {type: String, required: false },
    players: { type: [String], required: false },
    currentPlayer:  {type: String, required: false },
    winner: { type: String, required: false }
},
{minimize: false});

StateSchema.statics.getInstance = function(obj) {
    var newState = StateSchema.statics.findInstance(obj);
    
    if(!newState) return StateSchema.statics.createInstance(obj);
    return newState;
}

StateSchema.statics.createInstance = function(obj) {
    if(isNotInitialized(obj)) {
        var newState = {};

        newState.id = sassieDb.getId(obj);
        newState.gameId = sassieDb.getGameId();
        newState.state = obj;
        newState.actions = sassieDb.getActionWeights(obj.actions);
    }

    return new this(newState);
}

StateSchema.statics.findInstance = function(obj) {
    var newState = {};
    console.log("Sassie: " + sassieDb.getId(obj));
    StateSchema.find({id: sassieDb.getId(obj)}, function(err, object){
        if(err) console.log(err);
        if(object) return object;
    });
}

module.exports = mongoose.model('State', StateSchema);




function isNotInitialized(state){
    return !this.id && !this.state;
}

var emptyState = {
    id:      '',
    gameId:  '',
    state:   {},
    actions: [{}],
    actionTaken: '',
    players: [''],
    currentPlayer:  '',
    winner: ''
};

var initialState = {
    board: [['', '', ''],
     ['', '', ''],
     ['', '', '']],
    turn: "X",
    players: ["X", "O"],
    actions: ['move-0.0', 'move-1.0', 'move-2.0', 'move-0.1', 'move-1.1', 'move-2.1', 'move-0.2', 'move-1.2', 'move-2.2'],
    winner: ""
};