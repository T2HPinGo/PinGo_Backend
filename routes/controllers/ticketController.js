var Ticket = require('../models/ticket');
var Transformer = require('../utils/transformer');
var pingoLogger = require('../utils/pingoLogger');
var ticketService = require('../services/ticketService');
var ticketController = function() {

    var createNewTicket = function(req, res) {
        try {
            var ticket = new Ticket();
            ticketService.createNewTicket(req, res, ticket);
        } catch (err) {
            pingoLogger.log(err);
            res.json("Error");
        }

    };
    
    var showTicket = function(req, res) {
        try {
            Ticket.findById(req.params.ticket_id, function(err, ticket) {
                if (err) res.send(err);
                res.json(ticket);
            });
        } catch (err) {
            pingoLogger.log(err);
            res.json("Error");
        }

    };
    var deleteTicket = function(req, res) {
        try {
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
        } catch (err) {
            pingoLogger.log(err);
            res.json("Error");
        }
        // Use the Beer model to find a specific beer and remove it

    };
    return {
        createNewTicket: createNewTicket,
        showTicket: showTicket
    }

}();
module.exports = ticketController;
