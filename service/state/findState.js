const StateSchema = require('../../model/State');
const sassieDb = require('../../sassie/db/db');

function findState(obj, fail, found, notFound){
    sassieDb.getId(obj, function(id) {
        StateSchema.find({id: id}, callback);
    });

    function callback(err, objects){
        if(err){
            fail(err)
        }else if(objects.length === 0){ 
            notFound(objects)
        }else{
            found(objects);
        }
    }
};

module.exports = {
    findState: findState
};