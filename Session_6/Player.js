var PLAYER_EDGE = 20;
function Player(id) {
	this.id = id;
	this.x = Math.random()*700 - PLAYER_EDGE;
	this.y = Math.random()*700 - PLAYER_EDGE;
	this.v = 10;
	this.score = 0;
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
}
module.exports = Player;