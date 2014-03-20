/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
    console.log('blackhole server listening on port ' + app.get('port'));
    var clientio = require('socket.io-client');
    var socket = clientio.connect("http://192.168.56.111" , { port: 5555 });
    var auth_token = "7b70f69a2a4976d80bfa0382894d1553";
    var account_id = "4b31dd1d32ce6d249897c06332375d65";
    socket.emit("subscribe", { account_id: account_id, auth_token: auth_token, binding: "call.CHANNEL_CREATE.*"});
    socket.emit("subscribe", { account_id: account_id, auth_token: auth_token, binding: "call.CHANNEL_ANSWER.*"});
    socket.emit("subscribe", { account_id: account_id, auth_token: auth_token, binding: "call.CHANNEL_DESTROY.*"});
    socket.emit("subscribe", { account_id: account_id, auth_token: auth_token, binding: "conference.event.*"});
    socket.on("participants_event", function (data) {
        console.log(data);
    });
    socket.on("CHANNEL_CREATE", function (data) {
        console.log(data);
    });
    socket.on("CHANNEL_ANSWER", function (data) {
        console.log(data);
    });
    socket.on("CHANNEL_DESTROY", function (data) {
        console.log(data);
    });
});
