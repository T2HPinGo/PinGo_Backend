var Ticket = require('../models/ticket');
var pingoLogger = require('../utils/pingoLogger');
var response = require('../utils/response');
var Transformer = require('../utils/transformer')

var ticketService = function() {
    var createNewTicket = function(req, res, ticket) {
        Transformer.transformJsonToTicket(ticket, req.body);
        ticket.save(function(err) {
            if (err) res.send(err);

            res.json({
                status: 200,
                message: 'Ticket has been created',
                data: ticket
            });

        });
    };
    // var updateWorkerForTicket = function(req, res, ticket_id){
    //     Ticket.findOne({
    //         _id: ticket_id
    //     }, function(err, userItem) {
    //         console.log("Register Log: " + userItem)
    //         if (err) res.send(err);
    //         // If user not found 
           
    //     });
    // }
    return {
      createNewTicket: createNewTicket
    }
}();
module.exports = ticketService;
