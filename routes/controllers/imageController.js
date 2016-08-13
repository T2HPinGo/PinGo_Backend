var fs = require('fs');
var pingoLogger = require('../utils/pingoLogger');
var config = require('../configureImagePath');
var lwip = require('lwip');
var imageService = require('../services/imageService');
var CONSTANT = require('../utils/constants');
// Create endpoint /api/v1/images/upload

var imageController = function() {
    // Profile image
    var getImageProfile = function(req, res) {
        try {
            var file = req.params.file;
            imageService.getImageWithPath(res, config.getPathImageUser() + file);
        } catch (err) {
            pingoLogger.log(err)
            res.json("Error:");
        }

    };
    var postImageProfile = function(req, res) {
        try {
            imageService.postImageWithPath(req, res, config.getPathImageUser(),
                60, 60, '/images/profile/', 'jpg');
        } catch (err) {
            pingoLogger.log(err)
            res.json("Error:");
        }

    };

    // Ticket image
    var getImageTicket = function(req, res) {
        try {
            var file = req.params.file;
            imageService.getImageWithPath(res, config.getPathImageTicket() + file);
        } catch (err) {
            pingoLogger.log(err)
            res.json("Error:");
        }

    };

    var postImageTicket = function(req, res) {
        try {
            imageService.postImageWithPath(req, res, config.getPathImageTicket(),
                400, 300, '/images/ticket/', 'jpg');
        } catch (err) {
            pingoLogger.log(err)
            res.json("Error:");
        }

    };
    return {
        postImageProfile: postImageProfile,
        getImageProfile: getImageProfile,
        getImageTicket: getImageTicket,
        postImageTicket: postImageTicket
    }
}();
module.exports = imageController;
