var io = require('socket.io').listen(4242);
io.set('log.level', 1);

var Player = require('./Player');
var players = {}

io.sockets.on('connection', function(socket) {
	for (var playerId in players) {
		socket.emit('playerUpdate', players[playerId]);
	}
	
	var player = new Player(socket.id);
	players[socket.id] = player;
	
	io.sockets.emit('playerUpdate', player);
	
	socket.on('playerUpdate', function(playerData) {
		var player = players[socket.id];
		if (player !== undefined) player.updatePlayer(playerData);
		socket.broadcast.emit('playerUpdate', player);
	});
		
	
	socket.on('disconnect', function() {
		console.log(socket.id + " has disconnected from the server!");
		delete players[socket.id];
		io.sockets.emit('playerDisconnect', socket.id);
	});
});
	
