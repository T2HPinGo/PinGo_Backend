var User = require('../models/user');
var transformer = function() {
    var transformJsonToUser = function(user, jsonData){
        user.id = jsonData.id;
        user.location = jsonData.location;
        user.imageUrl = jsonData.imageUrl;
        user.createdAt = jsonData.createdAt;
        user.phoneNumber = jsonData.phoneNumber;
        user.email = jsonData.email;
        user.password = jsonData.password;
    };
    return {
      transformJsonToUser: transformJsonToUser
    }
}();
module.exports = transformer;