var config = require('./Config');
function Enemy() {
	this.x = Math.random()*(config.WINDOW_WIDHT - config.ENEMY_EDGE);
	this.y = Math.random()*(config.WINDOW_HEIGHT - config.ENEMY_EDGE);
	this.vx = Math.random()*10;
	this.vy = Math.random()*10;
}
Enemy.prototype.logic = function() {
	this.x += this.vx;
	this.y += this.vy;
	if (this.x + config.ENEMY_EDGE > config.WINDOW_WIDHT) {
		this.x = config.WINDOW_WIDHT - config.ENEMY_EDGE;
		this.vx *= -1;
	}
	else if (this.x < 0) {
		this.x = 0;
		this.vx *= -1;
	}
	if (this.y + config.ENEMY_EDGE > config.WINDOW_HEIGHT) {
		this.y = config.WINDOW_HEIGHT - config.ENEMY_EDGE;
		this.vy *= -1;
	}
	else if (this.y < 0) {
		this.y = 0;
		this.vy *= -1;
	}
}
module.exports = Enemy;