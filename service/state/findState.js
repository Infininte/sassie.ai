const StateSchema = require('../../model/State');
const sassie = require('../../sassie/sassie');

function findState(obj, fail, found, notFound){
    sassie.db.getId(obj, fail, function(id) {
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