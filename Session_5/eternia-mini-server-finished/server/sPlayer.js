
// sPlayer.js

function Player (id) {
	this.id = id;
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
	this.cdSince = +new Date();
	this.cdUntil = this.cdSince;
}
module.exports = Player;
Player.prototype = {

	id : undefined,
	cellId : undefined,
	color : "white",
	HP : 100

}
Player.prototype.setPos = function (pos) {
	this.pos = pos;
	this.cellId = pos.getIndex();
}