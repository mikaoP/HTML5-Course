function Player(id) {
	this.id = id;
	this.x = Math.random()*700 - 20;
	this.y = Math.random()*700 - 20;
	this.v = 10;
	this.score = 0;
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
}
module.exports = Player;