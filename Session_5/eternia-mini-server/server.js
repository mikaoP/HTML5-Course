var io = require('socket.io').listen(4242);
io.set('log.level', 1);

var Map = require('./js/Map.js');
var Camera = require('./js/Camera.js');
var Cell = require('./js/Cell.js');
var Pos = require('./js/Pos.js');

var map = new Map();
var cameras = {}

io.sockets.on('connection', function(socket) {
	for (var cId in cameras) {
		socket.emit('cUpdate', cameras[cId]);
	}

	var camera = new Camera(socket.id);
	cameras[socket.id] = camera;


});
