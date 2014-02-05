function Player() {

}
Player.prototype.updateWithData = function(data) {
	if (data === undefined) return;
	if (data.id !== undefined) this.id = data.id;
	if (data.pos !== undefined) this.pos = data.pos;
	if (data.color !== undefined) this.color = data.color;
}