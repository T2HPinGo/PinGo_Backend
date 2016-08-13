var Ticket = require('../models/ticket');
var Transformer = require('../utils/transformer');
var pingoLogger = require('../utils/pingoLogger');
var ticketService = require('../services/ticketService');
var ticketController = function() {

    var createNewTicket = function(req, res) {
        var ticket = new Ticket();
        ticketService.createNewTicket(req, res, ticket);
    };
    var showTicket = function(req, res) {
        Ticket.findById(req.params.ticket_id, function(err, ticket) {
            if (err) res.send(err);
            res.json(ticket);
        });
    };
    var deleteTicket= function(req, res) {
        // Use the Beer model to find a specific beer and remove it
        Ticket.remove({
            _id: req.params.ticket_id
        }, function(err) {
            if (err)
                res.send(err);
            res.json({
                status: 200,
                message: 'Ticket removed from the locker!'
            });
        });
    };
    return {
        createNewTicket: createNewTicket,
        showTicket: showTicket
    }

}();
module.exports = ticketController;
