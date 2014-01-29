
var io = require('socket.io').listen(4242);
io.set('log level', 1);

var Cube = require('./Cube');

var cubes = {};

io.sockets.on('connection', function (socket) {

	// Envía la lista de cubos actual al nuevo jugador
	for (var playerId in cubes) {
		socket.emit('cubeUpdate', cubes[playerId]);
	}

	// Crea el nuevo cubo y lo envía a todos
	var cube = new Cube (socket.id);
	cubes[socket.id] = cube;
	io.sockets.emit('cubeUpdate', cube);

	socket.on('cubeUpdate', function (cubeData) {
		var cube = cubes[socket.id];
		if (cube !== undefined) cube.updateWithCubeData(cubeData);
		socket.broadcast.emit('cubeUpdate', cube);
	});

	socket.on('disconnect', function () {
		console.log(socket.id + " has disconnected from the server!");
		delete cubes[socket.id];
		io.sockets.emit('cubeDisconnect', socket.id);
	});

});