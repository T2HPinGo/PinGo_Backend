var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var User = require('../models/User');
var Ticket = require('../models/Ticket');

http.listen(4000, function() {
    console.log('Listening ne on *:4000');
});
var socketController = function() {
    var initSocket = function() {
        io.on('connection', function(client) {
            console.log("Hi")
            clientSocket = client
            clientSocket.on("pushTicketForCategoryA", function(category, title, urgent, userName, workerName) {
                var ticket = {}
                ticket["userName"] = userName
                ticket["category"] = category
                ticket["title"] = title
                ticket["urgent"] = urgent
                ticket["workerName"] = workerName

                io.emit("newTicketForCategoryA", ticket)
                console.log("Create new ticket: " + ticket["userName"])
                console.log("applyTicket-" + title)

            });
            clientSocket.on("applyTicket", function(workerName) {
                console.log("ApplyTicket")
                io.emit("newWorker", workerName)
            });

            clientSocket.on("CategoryChanel", function(ticket) {
                console.log("CategoryChanel")
                console.log(ticket);
                console.log(ticket.title);
                io.emit("newTicket", ticket);
            });

            clientSocket.on("workerBidTicket", function(worker, idTicket) {
                console.log("ApplyTicket")
                io.emit("newWorkerForTicket", worker, idTicket);
            });
        });
    };
    return {
        initSocket: initSocket
    }
}();
module.exports = socketController;
