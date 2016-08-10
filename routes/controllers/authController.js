var User = require('../models/user');
var Transformer = require('../utils/transformer')
var pingoLogger = require('../utils/pingoLogger')
var authService = require('../services/authService')
var authController = function() {
    var login = function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        // UserName and Password cannot Null 
        pingoLogger.log(username + " - " + password);
        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "user cannot empty"
            });
            return;
        }
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) res.send(err);
            // If user not found 
            if (!user)
                res.json({
                    "status": 401,
                    "message": "User have not existed"
                });
            if (user.password != password) {
                res.json({
                    "status": 401,
                    "message": "Password is not match"
                });
            } else {
                res.json({
                    "status": 200,
                    "message": "Login successfully"
                });
            }
        });
    };
    // Register and Update Profile
    var registerAccount = function(req, res){
      // Create a new instance of the User model
        var user = new User();
        // Set the user properties that came from the POST data
        console.log(req.body);
        console.log(req.file);
        // Save the beer and check for errors
        authService.updateUser(req, res, user)
    }
    return {
        "login": login,
        "registerAccount": registerAccount
    }
}();
module.exports = authController;
