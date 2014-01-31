var Player = function(id) {
	this.id = id;
	this.score = 0;
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
	this.name;
}
module.exports = Player;