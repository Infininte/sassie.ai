var gameState = {};

gameState.schema = {
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
};

gameState.object = {
    id:      '',
    gameId:  '',
    state:   {},
    actions: [{}],
    actionTaken: '',
    players: [''],
    currentPlayer:  '',
    winner: ''
};

module.exports = gameState;