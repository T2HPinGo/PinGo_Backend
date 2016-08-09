var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    id: String,
    email: String,
    username: String,
    password: String,
    isWorker: Boolean,
    location: {
        address: String,
        latitude: String,
        longtitude: String,
    },
    imageUrl: String,
    createdAt: String,
    phoneNumber: String

});
// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
