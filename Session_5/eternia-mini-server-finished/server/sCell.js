
// sCell.js

var CELL_EDGE = 50;

function Cell () {

	this.color = this.cellColors[Math.floor(Math.random()*this.cellColors.length)];
	if (this.color == "#267336") this.obj = "tree";
}
module.exports = Cell;
Cell.prototype = {

	playerId : undefined,
	cellColors : ["#67AC39", "#246B34", "#4D862D", "#47C2C2", "#267336"],
	color : undefined

}
Cell.prototype.isWalkable = function () {
	return (this.color != "#47C2C2" && this.obj == undefined && this.playerId === undefined);
}
Cell.prototype.setPlayerId = function (id) {
	this.playerId = id;
}