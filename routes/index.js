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
var socketController = require('./controllers/socketController');
// Connect to the Ezmart MongoDB
mongoose.connect(configDatabase.urlConnection());


// Socket
socketController.initSocket();

// /auth
router.route(API.VERSION + '/login')
    .post(authController.login);
    
router.post(API.VERSION + '/register',authController.registerAccount);

router.route(API.VERSION + '/user' + "/:user_id")
    .get(authController.userProfile)

router.route(API.VERSION + '/updateUser')
    .get(authController.updateProfileUser)

// Ticket
router.route(API.VERSION + '/ticket')
  .post(ticketController.createNewTicket);

router.route(API.VERSION + '/ticket' + "/:ticket_id")
    .get(ticketController.showTicket);
router.route(API.VERSION + '/ticket' + "/:ticket_id")
    .post(ticketController.updateWorkerForTicket);
router.route(API.VERSION + '/ticketOnCategory')
    .post(ticketController.getTicketInCategory);

router.route(API.VERSION + '/userTickets')
    .post(ticketController.getUserTickets);


// Image
router.route(API.VERSION + API.IMAGE_PROFILE + "/:file")
    .get(imageController.getImageProfile);
router.post(API.VERSION + API.IMAGE_PROFILE, uploadImage.single('imageUpload'),
    imageController.postImageProfile);

router.route(API.VERSION + API.IMAGE_TICKET + "/:file")
    .get(imageController.getImageTicket);
    
router.post(API.VERSION + API.IMAGE_TICKET, uploadImage.single('imageUpload'),
    imageController.postImageTicket);
// Export router
module.exports = router;
