var app = require('express')();
var http = require('http').createServer(handler);
var io = require('socket.io')(http);

let fs     = require('fs');
let log    = require('./lib/log.js');
let SocketBag = require('./lib/socket_bag.js');

// Create socket container
let sb = new SocketBag();

//log.info(`Started listening websocket on port ${config.socket.port}`);
//app.listen(config.socket.port);

function handler (req, res) {
  fs.readFile(__dirname + '/public/index.html', function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s", msg.content.toString());
        io.emit('chat message', msg.content.toString());
      }, {noAck: true});
    });
  });
});

/*
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
*/

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
