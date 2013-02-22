/*
 * GET tweet information.
 */

var model = require(__dirname + '/../models');

exports.countByDay = function(req, res){
    var numDays = req.params.numdays;
    model.getTweetCount(numDays, function(err, results) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};

exports.countByHour = function(req, res){
    var numDays = req.params.numdays;
    model.getTweetCountByhour(numDays, function(err, results) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};

exports.hashtags = function(req, res){
    model.getTweetHashtags(1, function(err, results) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};