const hashjs = require('hash.js');

function getId(state, fail, got){
    got(hashjs.sha512().update(JSON.stringify(state)).digest('hex'));
}

module.exports = {
    getId: getId
}