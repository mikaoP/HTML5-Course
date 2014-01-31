var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Player = require('./Player');
var players = {};
var pintado = false;
var currentColor = "white";

function colorRandom() {
	var time = Math.random()*10*1000;
	setTimeout(function() {
		currentColor ='#'+Math.floor(Math.random()*16777215).toString(16);
		io.sockets.emit('renderColor', currentColor);
		pintado = true;
	}, time);
}

io.sockets.on('connection', function(socket) {

	for (var playerId in players) {
		socket.emit('playerUpdate', players[playerId]);
	}
	socket.emit('renderColor', currentColor);

	var player = new Player(socket.id);
	players[socket.id] = player;

	socket.emit('getName');
	socket.on('getName', function(username) {
		var player = players[socket.id];
		player.name = username;
		io.sockets.emit('playerUpdate', player);
	});

	io.sockets.emit('playerUpdate', player);

	socket.on('playerHit', function() {
		var player = players[socket.id];
		if (player === undefined) return;
		if (pintado) {
			++player.score;
			pintado = false;
			currentColor = "white";
			io.sockets.emit('renderColor', currentColor);
			colorRandom();
		}
		else --players[socket.id].score;
		io.sockets.emit('playerUpdate', player);
	});

	socket.on('disconnect', function() {
		console.log(socket.id + " has disconnected from the server!");
		delete players[socket.id];
		io.sockets.emit('playerDisconnect', socket.id);
	});
});

colorRandom();