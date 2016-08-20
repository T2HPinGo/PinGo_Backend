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
                console.log("ApplyTicket: " + price);
                io.emit("newWorkerForTicket", worker, idTicket, price);
            });
            clientSocket.on("updateTicket", function(idTicket, statusTicket, idUser){
                console.log("UpdateTicket: " + idTicket + " - " + statusTicket);
                io.emit("changeStatusTicket", idTicket, statusTicket, idUser);
            });
        });
    };
    return {
        initSocket: initSocket
    }
}();
module.exports = socketController;
