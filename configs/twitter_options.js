/**
 * Setup twitter request options
 */
var twitter_options = {};
    
twitter_options.headers = {};
  

twitter_options.host = "stream.twitter.com";
twitter_options.path = "/1.1/statuses/filter.json?track=bieber";
twitter_options.method = "GET";
twitter_options.headers.Authorization = "Basic " + new Buffer("username:password").toString("base64");

module.exports = twitter_options;