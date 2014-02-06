
// Camera.js

function Camera (x,y) {
	this.pos = new Pos (x||0,y||0);
	this.targetPos = this.pos.clone();
}

Camera.prototype = {
	logic : function (dt) {
		this.pos.x += (this.targetPos.x*CELL_EDGE+CELL_EDGE/2-this.pos.x)/(dt);
		this.pos.y += (this.targetPos.y*CELL_EDGE+CELL_EDGE/2-this.pos.y)/(dt);
	},
	focusOnContext : function (ctx) {
		ctx.translate(-(this.pos.x-canvas.width/2), -(this.pos.y-canvas.height/2));
	}
}