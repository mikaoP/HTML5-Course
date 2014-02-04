
// Camera.js

function Camera (x,y) {
	this.pos = new Pos (x||0,y||0);
}

Camera.prototype = {
	logic : function (dt) {
		this.pos.x += (player.x-this.pos.x/CELL_EDGE)/(dt/100);
		this.pos.y += (player.y-this.pos.y/CELL_EDGE)/(dt/100);
		//console.log("pos:"+this.pos.getIndex()+", targetPos:"+this.targetPos.getIndex());
	},
	focusOnContext : function (ctx) {
		ctx.translate(-(this.pos.x-canvas.width/2), -(this.pos.y-canvas.height/2));
	}
}