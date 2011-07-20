var Express = require("express")
var Socket = require("socket.io")
require("./ClientHandler")

var server = Express.createServer();
var io = Socket.listen(server);
server.configure(function() {
	server.use(Express.static(__dirname + '/public'));
});

server.listen(8080);

var clientsHandler = new Clients();
io.of('/chat').on("connection", function(socket) {
	clientsHandler.add(socket);
	socket.emit("connected");
});