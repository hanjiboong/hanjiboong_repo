var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var http = require('http');
var socket_io = require('socket.io');


var routes = require('./routes/index');
var users = require('./routes/users');

var ejs=require("ejs");

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine(".ejs", ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);


/* *********** 사용자 정의 변수 ********** */

var LISTEN_PORT = 8080;

var chatMembers = [];
var chatLog = [];


/* *********** socket.io ********** */


var io = socket_io();
app.io = io;

io.sockets.on("connection",function(socket){
    console.log('User\'s chatting connected!');
    socket.on("sendMessage",function(data){
        chatLog.push({
          id:data.id,
          msg:data.msg
        });
        // 맨 뒤 id
        data.lastMsgId = chatLog.slice(-1)[0]["id"];
        // 뒤에서 두번째 id
        data.lastSecondMsgId = chatLog.slice(-2)[0]["id"];
        // (6) 받은 문자열을 모든 클라이언트에게 getMessage 이벤트를 발생시키면서 전송한다.
        io.sockets.emit("getMessage",data);
    });
})//io.socket.on


/* ********** start - 사용자 정의 함수 ********** */

/* index  */
app.get("/", function(req, res){
  //res.end("ok");
  res.render("index");
});

app.get("/timeline", function(req, res) {
  res.render("timeline");
});

app.get("/album", function(req, res) {
  res.render("album");
});

app.get("/albumContents", function(req, res) {
  res.render("albumContents");
});

app.get("/calendar", function(req, res) {
  res.render("calendar");
});

app.get("/notice", function(req, res) {
  res.render("notice");
});

app.get("/setting", function(req, res) {
  res.render("setting_notice");
});

app.get("/profile", function(req, res) {
  res.render("profile");
});

/* chatting  */
app.get('/chat', function (req, res) {
  res.sendfile(__dirname + '/views/chat.html');
});



/* ********** end - 사용자 정의 함수 ********** */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
