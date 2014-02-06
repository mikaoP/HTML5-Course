function Enemy() {
	this.x = Math.random()*700 - 20;
	this.y = Math.random()*700 - 20;
	this.vx = Math.random()*10;
	this.vx = Math.random()*10;
}
Enemy.prototype.logic = function() {
	this.x += this.vx;
	this.y += this.vy;
	if (this.x + 20 > 700) {
		this.x = 700 - 20;
		this.vx *= -1;
	}
	else if (this.x < 0) {
		this.x = 0;
		this.vx *= -1;
	}
	if (this.y + 20 > 700) {
		this.y = 700 - 20;
		this.vy *= -1;
	}
	else if (this.y < 0) {
		this.y = 0;
		this.vy *= -1;
	}
}
module.exports = Enemy;