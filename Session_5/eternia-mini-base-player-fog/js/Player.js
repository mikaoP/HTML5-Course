function Player() {
	this.x = Math.floor((Math.random()*canvas.width)/CELL_EDGE);
	this.y = Math.floor((Math.random()*canvas.height)/CELL_EDGE);
	this.color = "black";
}