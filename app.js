
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , mongo = require( 'mongodb')
  , https = require('https')
  , path = require('path');

/**
 * Setup DB
 */
var db_host = "127.0.0.1",
  db_port = mongo.Connection.DEFAULT_PORT,
  db_db = "tweets",
  db = new mongo.Db(db_db, new mongo.Server(db_host, db_port, {}));

db.open(function(err) {
  if(err) console.log(err.message);
  else console.log("Connected to DB");

  db.collection("tweets", function(err, collection) {
    tweetCollection = collection;
  });
    
});

/**
 * Get twitter config
 */
var twitter_options = require('./configs/twitter_options');


console.log(twitter_options);
/**
 * Make the request and do something with the response
 */
var twitter_request = https.request(twitter_options, function(res) {
  var body = '';

  res.on("data", function(chunk) {
    var tweet = JSON.parse(chunk);
    // tweetCollection.insert(tweet, function() {
    //   console.log("Tweet added");
    // });
  });

  res.on("end", function() {
    console.log("Disconnected");
  });
});

twitter_request.end();

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

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
