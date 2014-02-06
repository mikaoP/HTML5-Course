function Map () {
	this.cells = {};
	this.players = {};
}
Map.prototype.getCellAt = function (pos) {

	var index;
	if (typeof pos == "string") index = pos;
	else index = pos.getIndex();

	var cell = this.cells[index];

	if (cell === undefined) {
		cell = new Cell (pos.x, pos.y);
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

}
Map.prototype.performMove = function (playerId, pos) {

	var player = this.players[playerId];
	if (player === undefined) return;

	if (player.pos === undefined) {
		console.log("ERROR");
		console.log(player);
	}
	var oldPos = player.pos && player.pos.clone();

	var cell = this.getCellAt(pos);
	cell.setPlayerId(player.id);
	player.setPos(pos);

	if (oldPos !== undefined) {
		var oldCell = this.getCellAt(oldPos);
		oldCell.setPlayerId(undefined);
	}

}