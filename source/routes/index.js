var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
var configDatabase = require('./utils/configDatabase');
var pingoLogger = require('./utils/pingoLogger');
// Controller
var authController = require('./controllers/authController');
console.log("Hello")
// Connect to the Ezmart MongoDB
mongoose.connect(configDatabase.urlConnection());

// /login
router.route('/login')
    .post(authController.login);
    
router.route('/register')
    .post(authController.registerAccount);

// Export router
module.exports = router;
