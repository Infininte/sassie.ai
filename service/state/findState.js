const StateSchema = require('../../model/State');
const sassieDb = require('../../sassie/sassieDb');

function findState(obj, fail, found, notFound){
    StateSchema.find({id: sassieDb.getId(obj)}, callback);

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