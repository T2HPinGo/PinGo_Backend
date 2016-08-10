var fs = require('fs');
var pingoLogger = require('../utils/pingoLogger');
var config = require('../configureImagePath');
var lwip = require('lwip');
var imageService = require('../services/imageService');
var CONSTANT = require('../utils/constants');
// Create endpoint /api/v1/images/upload

var imageController = function() {
    var getImageProfile = function(req, res) {
        console.log("OK con de");
        var file = req.params.file;
        console.log("File: " + file);
        imageService.getImageWithPath(res, config.getPathImageUser() + file);
    };
    var postImageProfile = function(req, res) {
        console.log(req.file)
        imageService.postImageWithPath(req, res, config.getPathImageUser(),
            60, 60, '/images/profile/', 'jpg');
    };
    return {
        postImageProfile: postImageProfile,
        getImageProfile: getImageProfile
    }
}();
module.exports = imageController;
