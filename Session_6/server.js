var io = require('socket.io').listen(4242);
io.set('log.level', 1);

var Player = require('./Player');
var players = {}
var Enemy = require('./Enemy');
var enemies = [new Enemy()];
var Cube = require('./Cube');
var cube = new Cube();

function syncEnemies() {
	for (var enemyId in enemies) {
		enemies[enemyId].logic();
		io.sockets.emit('enemiesUpdate', enemies[enemyId]);
	}
}
io.sockets.on('connection', function(socket) {
	for (var playerId in players) {
		socket.emit('playerUpdate', players[playerId]);
	}
	
	var player = new Player(socket.id);
	players[socket.id] = player;
	io.sockets.emit('playerUpdate', player);

	socket.emit('cubeUpdate', cube);
	
	syncEnemies();

	socket.on('gotCube', function() {
		var player = players[socket.id];
		if (player !== undefined) ++player.score;
	});
});