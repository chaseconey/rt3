
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , https = require('https')
  , path = require('path');

/**
 * Setup DB
 */
var db = require('./configs/db');

/**
 * Get twitter config
 */
var twitter_options = require('./configs/my_twitter_options');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io = require('socket.io').listen(server);

/**
 * Make the request and do something with the response
 */
var twitter_request = https.request(twitter_options, function(res) {
  var body = '';
  res.on("data", function(chunk) {
    var tweet = JSON.parse(chunk);
    /**
     * Send our tweet to the loaded page
     */
    io.sockets.emit("tweet", tweet);
    
    db.insert(tweet, function() {
      //
    });
  });

  res.on("end", function() {
    console.log("Disconnected");
  });
});
twitter_request.end();
