var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(4000, function() {
    console.log('Listening ne on *:4000');
});

var socketController = function() {
    var initSocket = function() {
        io.on('connection', function(client) {
            console.log("Hi")
            clientSocket = client
            clientSocket.on("CategoryChanel", function(ticket) {
                console.log("CategoryChanel")
                console.log(ticket);
                console.log(ticket.title);
                io.emit("newTicket", ticket);
            });

            clientSocket.on("workerBidTicket", function(worker, idTicket, price) {
                console.log("ApplyTicket: " + worker["username"] + "--" + idTicket);
                io.emit("newWorkerForTicket", worker, idTicket, price);
            });
            clientSocket.on("updateTicket", function(worker, ticket){
                console.log("UpdateTicket: " + ticket["title"]);
                io.emit("changeStatusTicket", worker,ticket);
            });
        });
    };
    return {
        initSocket: initSocket
    }
}();
module.exports = socketController;
