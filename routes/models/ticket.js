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
        username: String,
        firstname: String,
        lastname: String,
        phoneNumber: String,
        profileImage: {
            imageUrl: String,
            width: Number,
            height: Number
        }
    },
    responsible: {
        id: String,
        username: String,
        phoneNumber: String,
        firstname: String,
        lastname: String,
        profileImage: {
            imageUrl: String,
            width: Number,
            height: Number
        },
        ticket: String,
        price: String,
        latitude: String,
        longtitude: String
    },
    createdAt: String,
    isUrgent: Boolean,
    status: String,
    workingHour: String,
    descriptions: String,
    payment: String,
    rating: Number,
    comment: String,
    dateBegin: String,
    timeBegin: String,
    bidingList: []
});
// Export the Mongoose model
module.exports = mongoose.model('Ticket', TicketSchema);
