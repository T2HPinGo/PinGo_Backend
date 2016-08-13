var User = require('../models/user');
var pingoLogger = require('../utils/pingoLogger');
var response = require('../utils/response');
var Transformer = require('../utils/transformer')
var authService = function() {
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
        updateUser: updateUser
    }
}();
module.exports = authService;
