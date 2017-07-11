var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use("/javascripts", express.static(__dirname + '/javascripts'));
app.use("/css", express.static(__dirname + '/css'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/time', function(req, res){
    var time = req.body.time;
    console.log(time);
    res.json({message: 'got time'});
    io.emit('setTimer', {'time': time});
});

app.post('/agenda', function(req, res){
    var agenda = req.body.agenda;
    console.log(agenda);
    res.json({message: 'got agenda'});
    io.emit('setAgenda', {'agenda': agenda});
});

app.post('/alarm', function(req, res){
    var slow = req.body.slow;
    console.log(slow);
    res.json({message: 'got slow'});
    io.emit('setSlow', {'slow': slow});
});

app.get('/control', function(req, res){
  res.sendFile(__dirname + '/control.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    