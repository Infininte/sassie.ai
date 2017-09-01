function isInitialized(obj, isCallback, isntCallback){
    if(obj.id && obj.state){
        isCallback();
    }else{
        isntCallback();
    }
}

module.exports = {
    isInitialized: isInitialized
};