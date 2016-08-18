var User = require('../models/user');
var Transformer = require('../utils/transformer')
var pingoLogger = require('../utils/pingoLogger')
var authService = require('../services/authService')
var authController = function() {
    var login = function(req, res) {
        try {
            authService.login(req, res);
        } catch (err) {
            pingoLogger.log(err);
            res.json("Error");
        }

    };
    // User profile 
    var userProfile = function(req, res) {
        try {
            User.findById(req.params.user_id, function(err, user) {
                if (err) res.send(err);
                res.json(user);
            });
        } catch (err) {
            pingoLogger.log(err);
            res.json("Error");
        }

    };
    // Register and Update Profile
    var registerAccount = function(req, res) {
        try {
            // Create a new instance of the User model
            var user = new User();
            // Save the beer and check for errors
            authService.updateUser(req, res, user)
        } catch (err) {
            pingoLogger.log(err);
            res.json("Error");
        }

    };
    // Rating Worker
    var ratingWorker = function(req, res) {
        try {
            var ratingOfUser {
                ratingValue: req.body.rating,
                id: req.body.idUser
            };
            let idWorker = req.body.idWorker;
            User.findOne({
                id: idWorker
            }, function(err, userItem) {
                console.log("Register Log: " + userItem);
                if (err) res.send(err);
                // If user not found 
                userItem.rating.push(ratingOfUser);
                userItem.save(function(err) {
                    if (err)
                        res.send(err);
                    res.json({
                        status: 200,
                        message: 'Rating has been successful',
                        data: userItem
                    });
                });
            });
        } catch (err) {
            pingoLogger.log(err);
            res.json("Error");
        }
    };

    return {
        login: login,
        registerAccount: registerAccount,
        userProfile: userProfile,
        ratingWorker: ratingWorker
    }
}();
module.exports = authController;
