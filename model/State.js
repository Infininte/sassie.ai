const mongoose = require('mongoose');

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
{
    minimize: false
});


module.exports = mongoose.model('State', StateSchema);



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