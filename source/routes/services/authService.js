var User = require('../models/user');
var pingoLogger = require('../utils/pingoLogger');
var response = require('../utils/response');

var authService = function() {
    var updateUser = function(req, res, user) {
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json(response.getResponse('user has been added', user));
        });
    };
    return {
        updateUser: updateUser
    }
}();
module.exports = authService;
