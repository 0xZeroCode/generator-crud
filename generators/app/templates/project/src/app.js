var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var config = require('config');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

mongoose.connect(config.get('mongoDatabase'));


app.get('*', function (req, res) {
  res.sendfile('index.html');
});


app.set('port', config.get('port'));

var server = http.createServer(app);

server.listen(config.get('port'));

server.on('error', function (error) {
  console.error(error);
});

server.on('listening', function () {
  console.log('listening');
});
