const hashjs = require('hash.js');

function getId(state, got){
    got(hashjs.sha512().update(JSON.stringify(state)).digest('hex'));
}

module.exports = {
    getId: getId
}