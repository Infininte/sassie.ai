const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const adadb = require('./adadb');

/**
 * Mongoose config
 */
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("We're connected!")
});

var schema = mongoose.Schema({
    __hashId: { type: String, index: { unique: true } },
    board: [[String],
            [String],
            [String]],
    turn: String,
    players: [String],
    gameEnd: {
        gameEnding: String,
        winner: String
    }
});
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
    gameEnd: {
        gameEnding: "",
        winner: ""
    }
};

// adadb.find(initialState, State, function(err, returnedState){
//   if (err) return console.error(err);
//   if(returnedState) console.log('Found initial state! %s', JSON.stringify(returnedState))
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

State.find({}, function (err, state) {
  if (err) return console.error(err);
  console.log('Found initial state! %s', JSON.stringify(state))
});

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
app.get('*', (req, res) => {
  res.sendFile("This is AI!");
});

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', '✓', app.get('port'), app.get('env')); 
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;