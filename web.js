var express = require("express");
var logfmt = require("logfmt");
var pg = require('pg');
var app = express();

//require the Twilio module and create a REST client
var twilio = require('twilio');
var client = twilio('PN4f8d200af39a91f20272f96a5ba8b050', 'ACa1a2f0c274fa21513d4fa48b243bd14c');

app.use(logfmt.requestLogger());

pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  if (err) return console.error(err);

  client.query('SELECT * FROM your_table', function(err, result) {
    done();
    if(err) return console.error(err);
    console.log(result.rows);
  });
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Respond to text messages that come in from Twilio
app.post('/sms', function(req, res) {
  var twiml = new twilio.TwimlResponse();
  twiml.sms('hello. i am courtbot. some call me the bot of justice.')
  res.send(twiml.toString());
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});