var io = requiere('socket.io').listen(4242);
io.set('log level', 1);

var Camera = require('./js/sCamera');
var Cell = require('./js/sCell');
var Map = require('./js/sMap');
var Pos = require('./js/sPos');

var cameras = {}
var map = new Map()

io.sockets.on('connection', function(socket) {
	var camera = new Camera();
	for (var cameraId in cameras) {
		socket.emit('cameraUpdate', cameras[cameraId]);
	}
	
});