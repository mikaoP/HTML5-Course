var Player = function(id) {
	this.id = id;
	this.x = Math.floor(Math.random()*60)*20;
	this.y = Math.floor(Math.random()*30)*20;
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
}
Player.prototype.updatePlayer = function(data) {
	if (data === undefined) return;
	if (data.x !== undefined) this.x = data.x;
	if (data.y !== undefined) this.y = data.y;
}
module.exports = Player;
