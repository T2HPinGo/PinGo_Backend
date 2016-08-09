var pingoLogger = function(){
  var debug = function(message){
    console.debug(message);
  };
  var log = function(message){
    console.log(message);
  };
  var error = function(message){
    console.log(message);
  }
  return {
    debug: debug,
    log: log,
    error: error
  }
}();
module.exports = pingoLogger;
