var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    id: String,
    email: String,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    isWorker: Boolean,
    location: {
        address: String,
        city: String,
        latitude: String,
        longtitude: String,
    },
    createdAt: String,
    phoneNumber: String,
    profileImage: {
        imageUrl: String,
        width : Number,
        height: Number
    },
    rating: [], 
    averageRating: Number,
    isFemale: Boolean,
    category: String

});
// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);

