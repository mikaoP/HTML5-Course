
// Cell.js

// color picker: http://color.hailpixel.com/

var CELL_EDGE = 50;

function Cell () {

	this.color = this.cellColors[Math.floor(Math.random()*this.cellColors.length)];
	this.genBuffer();

}
Cell.prototype = {

	buff : undefined,
	playerId : undefined,
	//cellColors : ["#67AC39", "#246B34", "#4D862D", "#47C2C2"],
	cellColors : ["#47C2C2"],
	color : undefined

}
Cell.prototype.genBuffer = function (ctx) {

	var buffer = this.buff;
	if (buffer === undefined) {
		buffer = document.createElement('canvas');
		buffer.width = CELL_EDGE;
		buffer.height = CELL_EDGE+20;
	}

	var bufferCtx = buffer.getContext('2d');
	bufferCtx.clearRect(0,0,buffer.width,buffer.height);
	bufferCtx.fillStyle = this.color;

	if (this.color != "#47C2C2") {
		bufferCtx.fillRect(0,0,CELL_EDGE,CELL_EDGE+30);
		
		bufferCtx.save();
		bufferCtx.fillStyle = "black";
		bufferCtx.globalAlpha = 0.1;
		bufferCtx.fillRect(0,CELL_EDGE+1,CELL_EDGE,30);
		bufferCtx.restore();

	} else {
		bufferCtx.fillRect(0,10,CELL_EDGE,CELL_EDGE+1);

	}

	this.buff = buffer;

}
Cell.prototype.isWalkable = function () {
	return (this.color != "#47C2C2" && this.playerId === undefined);
}
Cell.prototype.setPlayerId = function (id) {
	this.playerId = id;
	this.genBuffer();
}
Cell.prototype.updateWithData = function (cellData) {
	for (var prop in cellData) this[prop] = cellData[prop];
	this.genBuffer();
}

function pointToCellPos (x,y) {
	return new Pos (Math.floor(x/CELL_EDGE), Math.floor(y/CELL_EDGE));
}