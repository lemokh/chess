const http = reqiure('http').createServer();
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    socket.emit('welcome', 'Hello and Welcome to the Socket.io Server')
    console.log('New Client is Connected');
});



http.listen(port, () => {
    console.log('Server is listening on localhost:' + port);
});