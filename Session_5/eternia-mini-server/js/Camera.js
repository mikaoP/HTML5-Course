function Camera (x,y) {
	this.pos = new Pos (x||0,y||0);
	this.targetPos = this.pos.clone();
}

Camera.prototype = {
	logic : function () {
		this.pos.x += (this.targetPos.x-this.pos.x)*100;
		this.pos.y += (this.targetPos.y-this.pos.y)*100;
	},
	focusOnContext : function (ctx) {
		ctx.translate(-(this.pos.x-canvas.width/2), -(this.pos.y-canvas.height/2));
	}
}