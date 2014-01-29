function Player(props) {
	if (props.username !== undefined) this.username = props.username;
};
Player.prototype.sayHi = function() {
	console.log("HI! I am " + this.username);
};
Player.prototype.username = "Anonymouse";

module.exports = Player;