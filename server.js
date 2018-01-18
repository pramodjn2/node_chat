var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var http = require('http').Server(app);
var fs = require("fs");
var path = require('path');
var request = require('ajax-request');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 8000; 

// simple api
app.get('/', function(req, res){
  res.send('hello world');
});
// api end


// socket api
io.sockets.on('connection', function(socket) {
  /* Appointment data and slider */
  socket.on('get_slider', function(request_data) {
    console.log(request_data);
    request({
      url: base_url+'api/appointment_slider?version=1&lang=english&patient_id='+request_data.patient_id,
      method: 'post',
      data: {
        patient_id: request_data.patient_id,
        user_id :  request_data.user_id,
        token : request_data.token,
        lat : request_data.lat,
        lang : request_data.lang
      }
    }, function(err, data, body) {
     socket.emit('responce_slider', body);
   });
  });

});
// socket end

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
server.listen(port);
console.log('Magic happens at http://localhost:' + port);