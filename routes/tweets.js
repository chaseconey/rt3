/*
 * GET tweet information.
 */

var model = require(__dirname + '/../models');

exports.count = function(req, res){
    model.getTweetCount(7, function(err, results) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};