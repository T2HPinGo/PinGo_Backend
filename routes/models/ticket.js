var mongoose = require('mongoose');
var TicketSchema = new mongoose.Schema({
    id: String,
    title: String,
    category: String,
    ticketImages: [],
    location: {
        address: String,
        city: String,
        latitude: String,
        longtitude: String,
    },
    createBy: { // Id User 
        id: String,
        userName: String,
        phoneNumber: String,
        profileImage: {
            imageUrl: String,
            width: Number,
            height: Number
        }
    },
    responsible: {
        id: String,
        userName: String,
        phoneNumber: String,
        profileImage: {
            imageUrl: String,
            width: Number,
            height: Number
        }
    },
    createdAt: String,
    isUrgent: Boolean,
    status: String
});
// Export the Mongoose model
module.exports = mongoose.model('Ticket', TicketSchema);
