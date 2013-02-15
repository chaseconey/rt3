/*
 * GET home page.
 */

var db = require(__dirname + '/../configs/db');

exports.index = function(req, res){
  db.find({}, {"limit": 8, "sort": { "id": -1} }).toArray(function(err, tweets) {
    if(err) throw err;
    
    res.render('index', {
        title: 'rt3',
        tweets: tweets,
        count: tweets.length
    });
  });
};