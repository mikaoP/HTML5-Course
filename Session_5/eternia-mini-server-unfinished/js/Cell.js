// color picker: http://color.hailpixel.com/

var CELL_EDGE = 50;

function Cell () {

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
Cell.prototype.updateWithData = function(data) {
	if (data === undefined) return;
	if (data.color !== undefined) this.color = data.color;
	this.playerId = data.playerId;
	this.genBuffer();
}