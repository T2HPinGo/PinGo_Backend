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
    var updateWorkerForTicket = function(req, res) {
        try {
            var responsible = {
                "id": req.body.idWorker,
                "username": req.body.nameOfWorker,
                "phoneNumber": req.body.phoneNumber,
                "profileImage": {
                    "imageUrl": req.body.imageOfWorker,
                    "width": 60,
                    "height": 60
                }
            }
            Ticket.findOne({
                _id: req.params.ticket_id
            }, function(err, ticket) {
                if (!err) {
                    ticket.responsible = responsible
                    ticket.status = "InService"
                    ticket.save(function(err) {
                        if (err)
                            res.send(err);
                        res.json({
                            status: 200,
                            message: 'Ticket has been updated',
                            data: ticket
                        });
                    });
                }
            });
        } catch (err) {
            pingoLogger.log(err);
            res.json("Error");
        }

    };
    var updateStatusOfTicket = function(req, res) {
        try {
            var status = "Done"
            Ticket.findOne({
                _id: req.params.ticket_id
            }, function(err, ticket) {
                if (!err) {
                    ticket.status = status
                    ticket.save(function(err) {
                        if (err)
                            res.send(err);
                        res.json({
                            status: 200,
                            message: 'Ticket has been updated status',
                            data: ticket
                        });
                    });
                }
            });
        } catch (err) {
            pingoLogger.log(err);
            res.json("Error");
        }
    }
    return {
        createNewTicket: createNewTicket,
        showTicket: showTicket,
        updateWorkerForTicket: updateWorkerForTicket,
        updateStatusOfTicket: updateStatusOfTicket
    }

}();
module.exports = ticketController;
