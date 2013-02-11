
/*
 * GET home page.
 */

var db = require(__dirname + '/../configs/db');

exports.index = function(req, res){
  db.find({}, {"limit": 10}).toArray(function(err, tweets) {
    if(err) throw err;

    res.render('index', {
        title: 'Tweets',
        tweets: tweets
    });
  });
};