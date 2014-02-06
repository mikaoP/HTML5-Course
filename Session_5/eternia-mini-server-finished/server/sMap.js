

//sMap.js

var Pos = require('./sPos');
var Cell = require('./sCell');

function Map () {
	this.cells = {};
	this.players = {};
	this.FOG_DIST = 13;
	this.updatedPlayers = {};
}
module.exports = Map;
Map.prototype.getCellAt = function (pos) {

	var index;
	if (typeof pos == "string") index = pos;
	else index = pos.getIndex();

	var cell = this.cells[index];

	if (cell === undefined) {
		cell = new Cell ();
		this.cells[index] = cell;
	}
	
	return cell;

}
Map.prototype.movePlayerToPos = function (playerId, pos) {

	var player = this.players[playerId];
	if (player === undefined) return;

	var now = +new Date();

	if (player.cdUntil > now) return; //in cd

	var oldPos = player.pos;

	//It will have a position unless we are placing him in the map for the first time
	if (oldPos !== undefined) {
		var dist = oldPos.distToPos(pos);
		if (dist != 1) return;
	}

	var cell = this.getCellAt(pos);
	if (!cell.isWalkable()) return;

	this.performMove(playerId, pos);

	return true;

}
Map.prototype.performMove = function (playerId, pos) {

	var player = this.players[playerId];
	if (player === undefined) return;

	var oldPos = player.pos;

	var cell = this.getCellAt(pos);
	cell.setPlayerId(player.id);
	player.setPos(pos);

	if (oldPos !== undefined) {
		var oldCell = this.getCellAt(oldPos);
		oldCell.setPlayerId(undefined);
	}

	var now = +new Date();

	player.cdSince = now;
	player.cdUntil = now+0.5*1000;

	this.updatedPlayers[player.id] = true;

}
Map.prototype.sendUpdates = function (io) {
	for (var clientId in this.players) {
		this.sendViewablePlayersFromListForSocket(this.updatedPlayers, io.sockets.sockets[clientId]);
	}
	this.updatedPlayers = {};
}
Map.prototype.sendViewablePlayersFromListForSocket = function (list, socket) {
	if (socket === undefined) return;
	var client = this.players[socket.id];
	for (var id in list) {
		var updatedPlayer = this.players[id];
		if (this.canPlayerWithPlayer(client, updatedPlayer)) {
			socket.emit('playerUpdate', updatedPlayer);
		}
	}
}
Map.prototype.canPlayerWithPlayer = function (p1, p2) {
	return (p1.id == p2.id || p1.pos.distToPos(p2.pos) <= this.FOG_DIST);
}
Map.prototype.viewableCellHashByPos = function (center) {

	var cells = {};

	for (var y = center.y-this.FOG_DIST; y <= center.y+this.FOG_DIST; ++y) {
		for (var x = center.x-this.FOG_DIST; x <= center.x+this.FOG_DIST; ++x) {
			var pos = new Pos(x,y);
			if (center.distToPos(pos) <= this.FOG_DIST) cells[pos] = true;
		}
	}

	return cells;

}
Map.prototype.fillCellHash = function (cellHash) {

	if (cellHash === undefined) return;

	for (var cellId in cellHash) {
		cellHash[cellId] = this.getCellAt(cellId);
	}

}
Map.prototype.placePlayer = function (player) {

	this.players[player.id] = player;
	this.updatedPlayers[player.id] = true;

	var cell, rPos;
	while (cell == undefined || !cell.isWalkable()) {
		rPos = new Pos (Math.floor(Math.random()*7)-3,Math.floor(Math.random()*7)-3);
		cell = this.getCellAt(rPos);
	}

	cell.setPlayerId(player.id);
	player.setPos(rPos);

}