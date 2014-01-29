var config = require('./config');

function Cube (id) {
	this.id = id;
	this.x = Math.random()*config.MAP_WIDTH;
	this.y = Math.random()*config.MAP_HEIGHT;
	this.edge = Math.random()*(config.MAX_EDGE-config.MIN_EDGE)+config.MIN_EDGE;
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
}
Cube.prototype.updateWithCubeData = function (data) {

	if (data === undefined) return;
	if (data.x !== undefined) this.x = data.x;
	if (data.y !== undefined) this.y = data.y;

}

module.exports = Cube;