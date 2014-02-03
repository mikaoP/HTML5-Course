
// Camera.js

var Camera = function(id) {
	this.id = id;
	this.pos = new Pos (Math.random()*20, Math.random()*20);
	this.targetPos = this.pos.clone();
}

Camera.prototype = {
	logic : function (dt) {
		this.pos.x += (this.targetPos.x-this.pos.x)/(dt);
		this.pos.y += (this.targetPos.y-this.pos.y)/(dt);
		//console.log("pos:"+this.pos.getIndex()+", targetPos:"+this.targetPos.getIndex());
	},
	focusOnContext : function (ctx) {
		ctx.translate(-(this.pos.x-canvas.width/2), -(this.pos.y-canvas.height/2));
	}
}

module.exports = Camera;