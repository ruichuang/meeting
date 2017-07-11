var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

var server = app.listen(3000);
var io = require('socket.io').listen(server);

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



    