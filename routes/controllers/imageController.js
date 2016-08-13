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
        var file = req.params.file;
        imageService.getImageWithPath(res, config.getPathImageUser() + file);
    };
    var postImageProfile = function(req, res) {
        imageService.postImageWithPath(req, res, config.getPathImageUser(),
            60, 60, '/images/profile/', 'jpg');
    };

    // Ticket image
    var getImageTicket= function(req, res) {
        var file = req.params.file;
        imageService.getImageWithPath(res, config.getPathImageTicket() + file);
    };

    var postImageTicket = function(req, res) {
        imageService.postImageWithPath(req, res, config.getPathImageTicket(),
            400, 300, '/images/ticket/', 'jpg');
    };
    return {
        postImageProfile: postImageProfile,
        getImageProfile: getImageProfile,
        getImageTicket: getImageTicket,
        postImageTicket: postImageTicket
    }
}();
module.exports = imageController;
