
/**
 * Module dependencies.
 */

var express = require('express')
  , main = require('./routes/main')
  , group = require('./routes/group')
  , http = require('http')
  , https = require('https')
  , twitter = require('ntwitter')
  , path = require('path');

/**
 * Setup DB
 */
var db = require('./configs/db');

/**
 * Get twitter config
 */
var twitter_config = require('./configs/my_twitter_config');

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

app.get('/', main.index);
app.get('/group', group.index);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io = require('socket.io').listen(server);

/**
 * Make the request and do something with the response
 */

var twit = new twitter({
  consumer_key: twitter_config.consumer_key,
  consumer_secret: twitter_config.consumer_secret,
  access_token_key: twitter_config.access_token_key,
  access_token_secret: twitter_config.access_token_secret
});

twit.stream('statuses/filter', { track: twitter_config.track }, function(stream) {
  stream.on('data', function (tweet) {
    /**
     * Add extra fields to the db here
     */
    tweet.created = new Date();


    /**
     * Send our tweet to the loaded page
     */
    io.sockets.volatile.emit('tweet', {
      // Only send what the front end cares about
      user_name: tweet.user.name,
      tweet_text: tweet.text,
      profile_url: tweet.user.profile_image_url
    });

    db.insert(tweet, function() {
      //
    });
  });
});
