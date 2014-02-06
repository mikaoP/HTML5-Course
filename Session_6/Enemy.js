var ENEMY_EDGE = Math.random()*20 + 10;
function Enemy() {
	this.x = Math.random()*700 - ENEMY_EDGE;
	this.y = Math.random()*700 - ENEMY_EDGE;
	this.vx = Math.random()*10;
	this.vy = Math.random()*10;
}
Enemy.prototype.logic = function() {
	this.x += this.vx;
	this.y += this.vy;
	if (this.x + ENEMY_EDGE > 700) {
		this.x = 700 - ENEMY_EDGE;
		this.vx *= -1;
	}
	else if (this.x < 0) {
		this.x = 0;
		this.vx *= -1;
	}
	if (this.y + ENEMY_EDGE > 700) {
		this.y = 700 - ENEMY_EDGE;
		this.vy *= -1;
	}
	else if (this.y < 0) {
		this.y = 0;
		this.vy *= -1;
	}
}
module.exports = Enemy;