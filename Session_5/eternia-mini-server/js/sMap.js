var rangeVision = 12;
var CELL_EDGE = 50;
var Pos = require('./sPos');
var Cell = require('./sCell');

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
	var i0 = (pos.x - rangeVision)/CELL_EDGE;
	var i1 = (pos.x + rangeVision)/CELL_EDGE;
	var j0 = (pos.y - rangeVision)/CELL_EDGE;
	var j1 = (pos.y + rangeVision)/CELL_EDGE;

	for (var i = i0; i <= i1; ++i) {
		for (var j = j0; j <= j1; ++j) {
			var cellPos = new Pos(i,j);
			playerMap[cellPos] = this.getCellAt(cellPos);
		}
	}
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

Map.prototype.removePlayer = function (pos) {
	this.cells[pos].playerId = undefined;
}

module.exports = Map;