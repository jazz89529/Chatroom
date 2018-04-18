$(function() {
    let socket = io.connect();
/*
    socket.on('hello', function(data) {
        console.log(data);
    })

    socket.emit('hey', 'I am a client!');
*/

    $('#button').click(function () {
	let message = $('#input').val();
	let name = $('#name').val();	

	console.log(message);

	$('body').append('<p>' + name + ': ' + message + '</p>');
	socket.emit('message', {
	    name: name,
	    message: message
	});
    })

    socket.on('message2', function(data){
	$('body').append('<p>' + data.name + ': ' + data.message + '<p>');
        console.log('廣播：' + data);
    })

    socket.on('online', function() {
	$('body').append('<p>有人上線了</p>');
    })

    socket.on('offline', function(name){
	$('body').append('<p>' + name + ' 離線了</p>');
    })
});
