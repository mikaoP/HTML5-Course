// color picker: http://color.hailpixel.com/
var Pos = require('./sPos');
var CELL_EDGE = 50;

function Cell () {

	this.color = this.cellColors[Math.floor(Math.random()*this.cellColors.length)];
	this.playerId = undefined;
}
Cell.prototype = {

	cellColors : ["#67AC39", "#246B34", "#4D862D"],

}
module.exports = Cell;