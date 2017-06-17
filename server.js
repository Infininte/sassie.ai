const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

/**
 * Mongoose config
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("We're connected!")
});

var schema = mongoose.Schema({
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
var initialState = new State({
    board: [['', '', ''],
     ['', '', ''],
     ['', '', '']],
    turn: "X",
    players: ["X", "O"],
    gameEnd: {
        gameEnding: "",
        winner: ""
    }
});
initialState.save(function (err, initialState) {
  if (err) return console.error(err);
});

State.findOne(initialState, function (err, state) {
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