
var io = require('socket.io').listen(4242);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {

	socket.on('userConnected', function (username) {
		socket.broadcast.emit('chatMessage', {username:"System", message: username + " has connected to the server!"});
		socket.set('username', username);
	});

	socket.on('chatMessage', function (data) {
		io.sockets.emit('chatMessage', data);
	})

	socket.on('disconnect', function () {
		socket.get('username', function (err, username) {
			socket.broadcast.emit('chatMessage', {username:"System", message: username + " has disconnected from the server!"});
		});
	});

});

//server OP