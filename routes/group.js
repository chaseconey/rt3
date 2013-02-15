/*
 * GET group test page.
 */

var model = require(__dirname + '/../models');

exports.index = function(req, res){
	model.getTweetCount(7, function(err, results) {
        res.render("group",{
            results: results,
            title: "Charts n Stuff"
        });
    });
};