var config = require('./Config');
function Player(id) {
	this.id = id;
	this.x = Math.random()*(config.WINDOW_WIDHT - config.PLAYER_EDGE);
	this.y = Math.random()*(config.WINDOW_HEIGHT - config.PLAYER_EDGE);
	this.v = 10;
	this.score = 0;
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
}
Player.prototype.movedCorrectly = function(data) {
	var correct = false;
	if (Math.abs(this.x - data.x) === 10) {
		this.x = data.x;
		correct = true;
	}
	if (Math.abs(this.y - data.y) === 10) {
		this.y = data.y;
		correct = true;
	}
	return correct;
}
Player.prototype.moveIntoWindow = function() {
	if (this.x + config.PLAYER_EDGE > config.WINDOW_WIDHT) this.x = config.WINDOW_WIDHT - config.PLAYER_EDGE;
	else if (this.x < 0) this.x = 0;

	if (this.y + config.PLAYER_EDGE > config.WINDOW_HEIGHT) this.y = config.WINDOW_HEIGHT - config.PLAYER_EDGE;
	else if (this.y < 0) this.y = 0;
}
module.exports = Player;