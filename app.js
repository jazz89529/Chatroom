const express = require('express');
const http = require('http');
const path = require('path');
let io = require('socket.io');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

io = io.listen(server);

server.listen(4000);

//
io.sockets.on('connection', function(socket) {
    let name;
    
    console.log('有人連過來了');
    /*socket.emit("hello", "I am a Server!");
    
    socket.on('hey', function(data){
        console.log(data);
    });

    socket.broadcast.emit('hello', '有其他人連進來');
    */
    socket.on('message', function(data) {
	console.log(data);
	name = data.name;
	socket.broadcast.emit('message2', data);
    })
    
    socket.on('disconnect', function(){
	socket.broadcast.emit('offline', name);
    })

    socket.broadcast.emit('online');
});
