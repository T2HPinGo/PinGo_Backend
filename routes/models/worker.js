var mongoose = require('mongoose');
var WorkerSchema = new mongoose.Schema({
    id: String,
    email: String,
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
    rating: [], 
    averageRating: Number,
    profileImage: {
        imageUrl: String,
        width : Number,
        height: Number
    }

});
// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);

