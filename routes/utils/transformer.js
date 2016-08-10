var User = require('../models/user');
var transformer = function() {
    var transformJsonToUser = function(user, jsonData){
        var unix = Math.round(+new Date()/1000);
        var location = {};
        location["address"] = jsonData.address;
        location["city"] =  jsonData.city;
        location["longtitude"] = jsonData.longtitude;
        location["latitude"] = jsonData.latitude;
        user.location = location;
        user.imageUrl = jsonData.imageUrl;
        user.createdAt = unix + "";
        user.phoneNumber = jsonData.phoneNumber;
        user.email = jsonData.email;
        user.password = jsonData.password;
        user.username= jsonData.username;
    };
    return {
      transformJsonToUser: transformJsonToUser
    }
}();
module.exports = transformer;