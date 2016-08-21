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
                },
                "price": req.body.price
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
            let status = req.body.statusTicket;
            let idTicket = req.body.idTicket;
            pingoLogger.log("Update Status of Ticket: " + idTicket);
            Ticket.findOne({
                _id: idTicket
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
    };
    // Get User ticket 
    var getUserTickets = function(req, res) {
            try {
                let statusTicket = req.body.statusTicket;
                let idUser = req.body.idUser;

                Ticket.find({
                    'createBy.id': idUser
                }, function(err, tickets) {
                    if (err) res.send(err);
                    res.json({
                        status: 200,
                        message: 'History tickets',
                        data: tickets
                    });
                });
            } catch (err) {
                pingoLogger.log(err);
                res.json("Error");
            }
        }
        // Get History ticket
    var getHistoryTicket = function(req, res) {
        try {
            let statusTicket = req.body.statusTicket;
            let idWorker = req.body.idWorker;

            Ticket.find({
                'responsible.id': idWorker
            }, function(err, tickets) {
                if (err) res.send(err);
                res.json({
                    status: 200,
                    message: 'History tickets',
                    data: tickets
                });
            });
        } catch (err) {
            pingoLogger.log(err);
            res.json("Error");
        }
    };
    // Get tickets in category
    var getTicketInCategory = function(req, res) {
        try {
            let statusTicket = req.body.status
            let categoryRequest = req.body.category;
            let idWoker = req.body.idWorker
                // Ticket.find({
                //     status: statusTicket,
                //     category: categoryRequest
                // }, function(err, tickets) {
                //     if (err) res.send(err);
                //     res.json({
                //         status: 200,
                //         message: 'History tickets',
                //         data: tickets
                //     });
                // });
            Ticket.find({
                $and: [{
                    $or: [{
                        status: "Pending"
                    }, {
                        category: categoryRequest
                    }]
                }, {
                    $or: [{
                        status: "InService"
                    }, {
                        category: categoryRequest
                    }, {
                        idWoker: idWoker
                    }]
                }, {
                    $or: [{
                        status: "Done"
                    }, {
                        category: categoryRequest
                    }, {
                        idWoker: idWoker
                    }]
                }]
            }, function(err, tickets) {
                if (err) res.send(err);
                res.json({
                    status: 200,
                    message: 'History tickets',
                    data: tickets
                });
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
        updateStatusOfTicket: updateStatusOfTicket,
        getHistoryTicket: getHistoryTicket,
        getTicketInCategory: getTicketInCategory,
        getUserTickets: getUserTickets,
        deleteTicket: deleteTicket
    }

}();
module.exports = ticketController;
