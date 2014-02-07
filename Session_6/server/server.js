var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Player = require('./Player');
var players = {}
var Enemy = require('./Enemy');
var enemies = [new Enemy()];
var Cube = require('./Cube');
var cube = new Cube();
var config = require('./Config');


function syncEnemies() {
	for (var i = 0; i < enemies.length; ++i) {
		var enemy = enemies[i];
		enemy.logic();
		for (playerId in players) {
			var player = players[playerId];
			if (player.x >= enemy.x && player.x <= enemy.x 
				+ config.ENEMY_EDGE && player.y >= enemy.y && player.y <= enemy.y 
				+ config.ENEMY_EDGE) {
				--player.score;
				io.sockets.emit('playerUpdate', player);
			}
		}
		
	}
	io.sockets.emit('enemiesUpdate', enemies);
}

setInterval(syncEnemies, 16);

io.sockets.on('connection', function(socket) {
	for (var playerId in players) {
		socket.emit('playerUpdate', players[playerId]);
	}
	
	var player = new Player(socket.id);
	players[socket.id] = player;
	io.sockets.emit('playerUpdate', player);

	socket.emit('cubeUpdate', cube);

	socket.on('playerMove', function(playerData) {
		if (player.movedCorrectly(playerData)) {
			player.moveIntoWindow();
			if (player.x + config.PLAYER_EDGE >= cube.x && player.x <= cube.x 
				+ config.CUBE_EDGE && player.y + config.PLAYER_EDGE >= cube.y && player.y <= cube.y 
				+ config.CUBE_EDGE) {
				++player.score;
				cube = new Cube();
				io.sockets.emit('cubeUpdate', cube);
				enemies.push(new Enemy());
			}
			io.sockets.emit('playerUpdate', player);
		}
	});

	socket.on('disconnect', function() {
		delete players[socket.id];
		io.sockets.emit('playerDisconnect', socket.id);
	});
});