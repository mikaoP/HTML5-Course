var config = require('./Config');
function Cube() {
	this.x = Math.random()*(config.WINDOW_WIDHT - config.CUBE_EDGE);
	this.y = Math.random()*(config.WINDOW_HEIGHT - config.CUBE_EDGE);
}
module.exports = Cube;