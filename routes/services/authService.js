var User = require('../models/user');
var pingoLogger = require('../utils/pingoLogger');
var response = require('../utils/response');
var Transformer = require('../utils/transformer')
var authService = function() {
    var login = function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        var response = {}
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
            if (!user) {
                response = {
                    "status": 401,
                    "message": "User have not existed"
                }
            } else {
                if (user.password != password) {
                    response = {
                        "status": 401,
                        "message": "Password is not match"
                    }
                } else {
                    response = {
                        "status": 200,
                        "message": "Login successfully"
                    }
                }
            }
            res.json(response);
        });
    };
    var updateUser = function(req, res, user) {
        Transformer.transformJsonToUser(user, req.body)
        User.findOne({
            email: user.email
        }, function(err, userItem) {
            console.log("Register Log: " + userItem)
            if (err) res.send(err);
            // If user not found 
            if (userItem) {
                res.json({
                    status: 401,
                    message: "User have been existed"
                });
            } else {
                user.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({
                        status: 200,
                        message: 'User has been created',
                        data: user
                    });
                });
            }
        });

    };
    return {
        login: login,
        updateUser: updateUser
    }
}();
module.exports = authService;
