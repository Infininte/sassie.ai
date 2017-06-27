const hashjs = require('hash.js');

function getId(object){
    return hashjs.sha512().update(JSON.stringify(object)).digest('hex');
}

function save(object, schema, callback){
    object.__hashId = getId(object);

    console.log(object.__hashId);

    var newObject = new schema(object);
    newObject.save(callback);
}

function find(object, schema, callback){
    var thisErr, thisNewObject;
    if(object.__hashId) callback([[], thisNewObject]);

    schema.findOne({__hashId: getId(object)}).exec(callback);
}

db = {
    save: save,
    find: find
};

module.exports = db;