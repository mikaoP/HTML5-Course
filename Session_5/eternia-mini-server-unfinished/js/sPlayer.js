var Pos = require('./sPos');
function Player(id) {
	this.id = id;
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
}
Player.prototype.genPlayerPos = function() {
	var pos = new Pos(Math.floor(Math.random()*20), Math.floor(Math.random()*20));
	this.pos = pos;
}
module.exports = Player;