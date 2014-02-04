
// Pos.js

function Pos (x,y) {
	this.x = x;
	this.y = y;
}
Pos.prototype.getIndex = function () {
	return this.x+"x"+this.y;
}
Pos.prototype.toString = function () {
	return this.getIndex();
}
Pos.prototype.clone = function () {
	return new Pos (this.x,this.y);
}