(function() {
	var Client = function(clients, _socket) {
		var instance = this;
		var socket = _socket;

		socket.on("getClient", function() {
			socket.emit("getClient", {count: clients.getCounter()});
		});	
		socket.on("message", function(data) {
			clients.sendMessage(instance, data);
		});	
	
		this.send = function(data) {
			socket.emit("message", data);
		}
	}

	this.Clients = function() {
		var instance = this;
		var clients = new Array();
		var count = 0;
	
		this.add = function(socket) {
			count++;
			clients.push(new Client(instance, socket));
		}
		this.getCounter = function() { 
			return count;
		}
		this.sendMessage = function(client, message) { 
			for(i in clients) {
				if(clients[i] != client) {
					clients[i].send(message);
				}
			}
		}
	}
})();