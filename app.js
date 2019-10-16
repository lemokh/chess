var express = require("express"); // check

var app = express();
app.use(express.static("public"));

var http = require("http").Server(app);
var port = process.env.PORT || 3000;
var io = require("socket.io")(http);

var games = [],
  sendMoveToPlayer;
/////////////////////////////////

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

function getOpponentId(socket) {
  for (let i = 0; i < games.length; i++) {
    if (games[i][0] === socket.id) {
      sendMoveToPlayer = games[i][1];
      break;
    } else if (games[i][1] === socket.id) {
      sendMoveToPlayer = games[i][0];
      break;
    }
  }
}
//////////////////////////////////////

io.on("connection", function(socket) {
  console.log("socket connected --> id: " + socket.id);

  socket.on("requestOfferedGames", () => {
    socket.emit("loadOfferedGames", games);
  });

  socket.on("disconnect", function() {
    console.log("socket disconnected --> id: " + socket.id);
  });

  socket.on("gameOffered", function(data) {
    console.log(
      data[0] + " minute game offered by player 1 --> id: " + data[1]
    );

    socket.join(data[1]);

    // sends data to everyone except sender
    socket.broadcast.emit("addGame", data);

    games.push([socket.id, undefined]);
  });

  socket.on("initGame", function(data) {
    // data --> [ duration, player1 socket.id ]

    // player 2 joins room hosted by player 1
    socket.join(data[1]);

    for (let i = 0; i < games.length; i++) {
      if (games[i][0] === data[1]) {
        console.log("!!!");
        games[i][1] = socket.id;
        break;
      }
    }
    console.log("line 45: games --> " + games);

    // sends only to player 1 (private message)
    io.to(data[1]).emit("gameAccepted");
  });

  socket.on("endOfGame", function() {
    getOpponentId(socket);
    io.to(sendMoveToPlayer).emit("gameOver");
    /*
        // removes that game from games
        for (let i = 0; i < games.length; i++) {
            if (games[i][0] === data[1]) {
                games.splice(i, 1); 
                break;
            }
        }
        */
  });

  socket.on("resignation", function() {
    getOpponentId(socket);
    io.to(sendMoveToPlayer).emit("opponentResigns");
  });

  socket.on("chat message", function(msg) {
    console.log("socket id: " + socket.id + " --> says: " + msg);

    getOpponentId(socket);

    console.log("line 93: sendMoveToPlayer --> " + sendMoveToPlayer);

    // sends only to opponent (private message)??
    // seems instead to send to everyone in room, including sender
    // io.to(sendMoveToPlayer).emit('chat message', msg);

    // sends to everyone in room except sender
    socket.to(sendMoveToPlayer).emit("chat message", msg);
  });

  socket.on("move", function(clicks) {
    /*
        console.log('line 78: socket.id emits move --> ' + socket.id);
        console.log('line 79: moveclicks --> ' + clicks);
        console.log('line 80: games --> ' + games);
        
        // sends to all clients except sender
        // socket.broadcast.emit('movePiece', clicks);
        
        let sendMoveToPlayer;
        for (let i = 0; i < games.length; i++) {
            if (games[i][0] === socket.id) {
                console.log('line 89: games['+i+'] --> ' + games[i]);
                sendMoveToPlayer = games[i][1];
                break;
            }
            else if (games[i][1] === socket.id) {
                console.log('line 94: games['+i+'] --> ' + games[i]);
                sendMoveToPlayer = games[i][0];
                break;
            }
        }
        console.log('line 100: sendMoveToPlayer --> ' + sendMoveToPlayer);
        */
    console.log("clicks[2]: " + clicks[2]);
    // sends to all clients in room except sender
    socket.broadcast.to(clicks[2]).emit("movePiece", clicks);

    // sends only to opponent's socket via:
    // io.to(`${socket.id}`).emit('movePiece', clicks);
    // io.to(sendMoveToPlayer).emit('movePiece', clicks);
  });

  socket.on("newTurn", function(hostId) {
    socket.to(hostId).emit("clockToggler");
  });
});

//////////////////////////////

http.listen(port, function() {
  console.log("listening on *: " + port);
});
