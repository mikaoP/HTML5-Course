var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Pos = require('./js/sPos');
var Cell = require('./js/sCell');
var Player = require('./js/sPlayer');
var Map = require('./js/sMap');

var players = {}
var map = new Map();


io.sockets.on('connection', function(socket) {

	var player = new Player(socket.id);
	player.genPlayerPos();
	players[socket.id] = player;

	var playerMap = map.getPlayerCells(player.pos);
	map.placePlayer(player);

	socket.emit('mapUpdate', playerMap);
	io.sockets.emit('playerUpdate', player);
	

	socket.on('playerMove', function(pos) {

		if (map.movePlayerTo(player, pos)) {
			io.sockets.emit('playerUpdate', players[socket.id]);
		}

	});

	socket.on('disconnect', function() {
		delete players[socket.id];
		io.sockets.emit('playerDisconnect', socket.id);
	});

});