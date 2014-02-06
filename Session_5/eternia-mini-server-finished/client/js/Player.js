
// Player.js

var stepWAV = new Audio ();
stepWAV.src = "snd/step.wav";
stepWAV.volume = 0.5;

function Player (id) {
	this.id = id;
	this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
	this.genBuffer();
	this.cdSince = +new Date();
	this.cdUntil = this.cdSince;

	this.pos = new Pos(0,0);
	this.vpos = new Pos(0,0);
}
Player.prototype = {

	id : undefined,
	cellId : undefined,
	buffer : undefined,
	color : "white",	

	HP : 100

}
Player.prototype.setPos = function (pos) {
	if (this.pos.x != pos.x || this.pos.y != pos.y) {
		stepWAV.currentTime = 0;
		stepWAV.play();
	}
	this.pos.x = pos.x;
	this.pos.y = pos.y;
}
var barHeight = 8;
Player.prototype.genBuffer = function () {

	var buffer = this.buffer;
	if (buffer === undefined) {
		buffer = document.createElement('canvas');
		buffer.width = CELL_EDGE;
		buffer.height = CELL_EDGE;
	}

	var bufferCtx = buffer.getContext('2d');
	bufferCtx.fillStyle = this.color;
	bufferCtx.fillRect(10,10,CELL_EDGE-20,CELL_EDGE-20);

	bufferCtx.save();

	//HP BAR
	bufferCtx.translate(0,CELL_EDGE/2-barHeight/2);

	//shadow
	var oldAlpha = bufferCtx.globalAlpha;
	bufferCtx.globalAlpha *= 0.3;
	bufferCtx.fillStyle = "#000000";
	bufferCtx.fillRect(10, barHeight, CELL_EDGE-20, 2);
	bufferCtx.globalAlpha = oldAlpha

	bufferCtx.fillStyle = "white";
	bufferCtx.fillRect(5,0,CELL_EDGE-10,barHeight);
	bufferCtx.fillStyle = "green";
	bufferCtx.fillRect(6,1,(CELL_EDGE-12)*(this.HP/100),barHeight-2);

	//STAMINA BAR
	bufferCtx.translate(0,barHeight-3);
	bufferCtx.fillStyle = "#79C3D2";
	bufferCtx.fillRect(6,0,(CELL_EDGE-12)*this.getCDPercent(),2);

	bufferCtx.restore();

	this.buff = buffer;

}
Player.prototype.getCDPercent = function () { //[0,1]
	var now = +new Date();
	if (this.cdUntil < now) return 1;
	else return ((now-this.cdSince)/(this.cdUntil-this.cdSince));
}
Player.prototype.logic = function (dt) {
	if (this.cdUntil > +new Date()) this.genBuffer();
	this.vpos.x += (this.pos.x*CELL_EDGE-this.vpos.x)/(dt);
	this.vpos.y += (this.pos.y*CELL_EDGE-this.vpos.y)/(dt);

}
Player.prototype.updateWithData = function (playerData) {
	var cd = 0;
	if (this.cdSince != playerData.cdSince) {
		cd = playerData.cdUntil - playerData.cdSince;
	}
	for (var prop in playerData) {
		if (prop !== "pos") this[prop] = playerData[prop];
	}
	if (cd != 0) {
		this.cdSince = +new Date();
		this.cdUntil = this.cdSince+cd;
	}
	this.genBuffer();
}