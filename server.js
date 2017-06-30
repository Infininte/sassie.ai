const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const adadb = require('./adadb');
const ada = require('./ada');
const gameState = require('./gameState');

/**
 * Mongoose config
 */
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("We're connected!")
});

var schema = mongoose.Schema(gameState.schema);
var State = db.model('State', schema);

// State.remove({}, function (err, everything) {
//   if (err) return console.error(err);
//   console.log('Deleted everything %s', JSON.stringify(everything))
// })

var initialState = {
    board: [['', '', ''],
     ['', '', ''],
     ['', '', '']],
    turn: "X",
    players: ["X", "O"],
    actions: ['move-0.0', 'move-1.0', 'move-2.0', 'move-0.1', 'move-1.1', 'move-2.1', 'move-0.2', 'move-1.2', 'move-2.2'],
    winner: ""
};

// var testState = {
//     id:      'abc',
//     gameId:  '123',
//     state:   {
//         things: "blah blah",
//         foo: "bar"
//     },
//     actions: [{
//         action: "fly",
//         weight: .5
//     },
//     {
//         action: "sink",
//         weight: .7
//     }],
//     actionTaken: '',
//     players: ['player1', 'player2'],
//     currentPlayer:  'player1',
//     winner: ''
// }

// adadb.find(initialState, State, function(err, returnedState){
//   if (err) return console.error(err);
//   if(returnedState) {
    
//   }
//   if(!returnedState){
//     adadb.save(initialState, State, function(err, returnedState){
//       if (err) return console.error(err);
//       console.log('Saved initial state! %s', JSON.stringify(returnedState));
//     });
//   }
// });

// adadb.save(initialState, State, function (err, initialState) {
//   if (err) return console.error(err);
// });

// State.find({}, function (err, state) {
//   if (err) return console.error(err);
//   console.log('Found initial state! %s', JSON.stringify(state))
// });

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

/**
 * endpoints
 */
app.post('/api/ada', (req, res) => {
  adadb.find(req.body, State, function(err, returnedState){
    if (err) res.status(500).send("There was an error looking up your game state: " + err);
    if(returnedState) {
      res.send(ada.chooseAction(returnedState.actions));
    }
    if(!returnedState){
      adadb.save(req.body, State, function(err, returnedState){
        if (err) res.status(500).send("There was an error saving your game state: " + err);
        res.send(ada.chooseAction(returnedState.actions));
      });
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile("This is AI!");
});

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', '✓', app.get('port'), app.get('env')); 
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;