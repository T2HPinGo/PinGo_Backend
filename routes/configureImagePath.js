const SRC_PATH = require('../srcPath');
const CONFIG = function() {
    const IP_SERVER = "localhost";
    const PORT = "3000";
    var getIpAddress = function() {
        return "http://" + IP_SERVER + ":"+ PORT;
    };
    var getPathImageUser = function(){
        return SRC_PATH + "/images/profile/";
    };
    var getPathImageTicket = function(){
        return SRC_PATH + "/images/ticket/";
    }
    return {
        getIpAddress: getIpAddress,
        getPathImageUser:getPathImageUser,
        getPathImageTicket: getPathImageTicket
    }
}();
module.exports = CONFIG;
