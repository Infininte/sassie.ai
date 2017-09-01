const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const sassieDb = require('./sassie/sassieDb');
const sassie = require('./sassie/sassie');
const service = require('./service/service');

/**
 * Mongoose config
 */
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected!");

  service.state.getState(testObj, fail, got);

  function fail(err){
    console.log(err);
  };

  function got(state){
    console.log(state);
  };
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
app.post('/api/ada', (req, res) => {
  // Do something
});

var testObj = {
  winner : "", 
  actions : [ "move-0.0", "move-1.0", "move-2.0", "move-0.1", "move-1.1", "move-2.1", "move-0.2", "move-1.2", "move-2.2" ], 
  players : [ "X", "O" ], 
  turn : "X", 
  board : [ [ "", "", "" ], [ "", "", "" ], [ "", "", "" ] ] 
};





app.get('*', (req, res) => {
  res.sendFile("This is AI!");
});

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', '✓', app.get('port'), app.get('env')); 
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;


function isNotInitialized(state){
    return !this.id && !this.state;
}