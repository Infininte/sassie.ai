const hashjs = require('hash.js');

function getGameId(got){
    got(hashjs.sha512().update( (new Date()).getTime() ).digest('hex'));
}

module.exports = {
    getGameId: getGameId
}