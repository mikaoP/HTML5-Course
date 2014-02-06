var CUBE_EDGE = 20;
function Cube() {
	this.x = Math.random()*700 - CUBE_EDGE;
	this.y = Math.random()*700 - CUBE_EDGE;
}
module.exports = Cube;