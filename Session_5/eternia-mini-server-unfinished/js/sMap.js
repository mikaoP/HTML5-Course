var rangeVision = 12;
var Pos = require('./sPos');
var Cell = require('./sCell');
var CELL_EDGE = 50;

function Map () {
	this.cells = {};
}
Map.prototype.getCellAt = function (pos) {

	var index = pos.toString();
	var cell = this.cells[index];

	if (cell === undefined) {
		cell = new Cell ();
		this.cells[index] = cell;
	}
	
	return cell;

}
Map.prototype.getPlayerCells = function (pos) {
	var playerMap = {};
	var i0 = pos.x - rangeVision;
	var i1 = pos.x + rangeVision;
	var j0 = pos.y - rangeVision;
	var j1 = pos.y + rangeVision;

	for (var i = i0; i <= i1; ++i) {
		for (var j = j0; j <= j1; ++j) {
			var cellPos = new Pos(i,j);
			playerMap[cellPos] = this.getCellAt(cellPos);
		}
	}
	return playerMap;
}
Map.prototype.movePlayerTo = function(player, pos) {
	var playerOldMove = player.pos;

		if (Math.abs(playerOldMove.x - pos.x) +
			Math.abs(playerOldMove.y - pos.y) == 1) {

			player.pos.x = pos.x;
			player.pos.y = pos.y;

			this.cells[player[socket.id].pos].playerId = socket.id;
			this.cells[playerOldMove].playerId = undefined;

			return true;
		}
		else return false;
}

Map.prototype.placePlayer = function(playerData) {
	this.cells[playerData.pos].playerId = playerData.id;
}

Map.prototype.removePlayer = function (pos) {
	this.cells[pos.toString()].playerId = undefined;
}

module.exports = Map;