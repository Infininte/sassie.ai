const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const sassieDb = require('./sassie/sassieDb');
const sassie = require('./sassie/sassie');
const State = require('./model/State');

/**
 * Mongoose config
 */
mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("We're connected!")
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
  // State.find({id: 'bea88a3623d325a018e2967170b2bc282002cc8fcd20e9b2f8d886e75fe081d94214089106b261bf0c92f73b0d8e0ce66240813c60e6156ab84b1c72a4a8c37a'},
  //             function(err, object){
  //               console.log(object);
  //             })
});

var obj = {
  winner : "", 
  actions : [ "move-0.0", "move-1.0", "move-2.0", "move-0.1", "move-1.1", "move-2.1", "move-0.2", "move-1.2", "move-2.2" ], 
  players : [ "X", "O" ], 
  turn : "X", 
  board : [ [ "", "", "" ], [ "", "", "" ], [ "", "", "" ] ] 
};

var moveAgain = State.getInstance(obj);

console.log(moveAgain);

// console.log("Id: c80cbcef469636d5da316dc6324fab630346300394e1043763e505ebf0a3e0196deb10e0720a8ab524b14fdc73a1fbe84bd7462e5a1784cb6ccd449fcca10dff");
// console.log("Sassie: " + sassieDb.getId(obj));

// moveAgain.save(function(err, obj){
//   if(err) console.log(err);
//   console.log(obj);
// });


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