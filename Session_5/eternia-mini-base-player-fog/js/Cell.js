
// Cell.js

// color picker: http://color.hailpixel.com/

var CELL_EDGE = 50;

function Cell () {

	this.color = this.cellColors[Math.floor(Math.random()*this.cellColors.length)];
	this.genBuffer();

}
Cell.prototype = {

	playerId : undefined,
	cellColors : ["#67AC39", "#246B34", "#4D862D"],
	color : undefined

}
Cell.prototype.genBuffer = function (ctx) {

	var buffer = document.createElement('canvas');
	buffer.width = CELL_EDGE;
	buffer.height = CELL_EDGE;
	var bufferCtx = buffer.getContext('2d');
	bufferCtx.fillStyle = this.color;
	bufferCtx.fillRect(0,0,CELL_EDGE,CELL_EDGE);

	this.buff = buffer;

}