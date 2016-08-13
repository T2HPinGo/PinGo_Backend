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
var ticketController = require('./controllers/ticketController');
// Connect to the Ezmart MongoDB
mongoose.connect(configDatabase.urlConnection());

// /login
router.route(API.VERSION + '/login')
    .post(authController.login);
    
router.post(API.VERSION + '/register',authController.registerAccount);

// Ticket
router.route(API.VERSION + '/ticket')
  .post(ticketController.createNewTicket);

router.route(API.VERSION + '/ticket' + "/:ticket_id")
    .get(ticketController.showTicket)


// Image
router.route(API.VERSION + API.IMAGE_PROFILE + "/:file")
    .get(imageController.getImageProfile);
router.post(API.VERSION + API.IMAGE_PROFILE, uploadImage.single('profileImage'),
    imageController.postImageProfile);

router.route(API.VERSION + API.IMAGE_TICKET + "/:file")
    .get(imageController.getImageTicket);
    
router.post(API.VERSION + API.IMAGE_TICKET, uploadImage.single('imageTicket'),
    imageController.postImageTicket);

// Export router
module.exports = router;
