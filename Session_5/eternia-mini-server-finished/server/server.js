
// server.js

var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Pos = require('./sPos');
var Cell = require('./sCell');
var Map = require('./sMap');
var Player = require('./sPlayer');

var map = new Map ();

io.sockets.on('connection', function (socket) {

	var player = new Player(socket.id);
	map.placePlayer(player);

	map.sendUpdates(io);
	map.sendViewablePlayersFromListForSocket(map.players, socket);

	var cellHash = map.viewableCellHashByPos(player.pos);
	map.fillCellHash(cellHash);
	socket.emit('updateCells', cellHash);

	socket.on('moveToPos', function (move) {

		var player = map.players[socket.id];
		if (player === undefined) return;
		var oldPos = player.pos.clone();

		if (map.movePlayerToPos(socket.id, new Pos(move.x,move.y))) {
			map.sendUpdates(io);

			var cellHash = map.viewableCellHashByPos(player.pos);
			var oldCellHash = map.viewableCellHashByPos(oldPos);

			for (var cellId in oldCellHash) delete cellHash[cellId]; //Only get new cells
			
			map.fillCellHash(cellHash);
			socket.emit('updateCells', cellHash);

		}

	});

});