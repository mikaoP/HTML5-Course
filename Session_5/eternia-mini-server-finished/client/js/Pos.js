
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
Pos.prototype.distToPos = function (pos) {
	return Math.sqrt(Math.pow(pos.x-this.x, 2)+Math.pow(pos.y-this.y,2));
}