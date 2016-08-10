var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
var configDatabase = require('./utils/configDatabase');
var pingoLogger = require('./utils/pingoLogger');
var API = require('./utils/apiConstant');
// Multer Upload file
var uploadImage = multer({
    dest: './images'
});
var upload = multer()
// Controller
var authController = require('./controllers/authController');
var imageController = require('./controllers/imageController');
// Connect to the Ezmart MongoDB
mongoose.connect(configDatabase.urlConnection());

// /login
router.route('/login')
    .post(authController.login);
    
router.post('/register', upload.array(), authController.registerAccount);

// Image
router.route(API.VERSION + API.IMAGE_PROFILE + "/:file")
    .get(imageController.getImageProfile);
router.post(API.VERSION + API.IMAGE_PROFILE, uploadImage.single('profileImage'),
    imageController.postImageProfile);

// Export router
module.exports = router;
