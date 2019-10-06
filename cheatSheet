io.on('connect', onConnect);

function onConnect(socket) {

  // sends to the client
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // sends to all clients except sender
  socket.broadcast.emit('broadcast', 'hello friends!');

  // sends to all clients in 'game' room except sender
  socket.to('game').emit('nice game', "let's play a game");

  // sends to all clients in 'game1' and/or in 'game2' room, except sender
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // sends to all clients in 'game' room, including sender
  io.in('game').emit('big-announcement', 'the game will start soon');

  // sends to all clients in namespace 'myNamespace', including sender
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // sends to a specific room in a specific namespace, including sender
  io.of('myNamespace').to('room').emit('event', 'message');

  // sends to individual socketid (private message)
  io.to(`${socketId}`).emit('hey', 'I just met you');

  // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
  // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

  // sends with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});

  // sends without compression
  socket.compress(false).emit('uncompressed', "that's rough");

  // sends a message that might be dropped if the client is not ready to receive messages
  socket.volatile.emit('maybe', 'do you really need it?');

  // specifying whether the data to send has binary data
  socket.binary(false).emit('what', 'I have no binaries!');

  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');

  // sending to all connected clients
  io.emit('an event sent to all connected clients');

};