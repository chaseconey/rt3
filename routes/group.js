/*
 * GET group test page.
 */

var model = require(__dirname + '/../models');

exports.index = function(req, res){
	res.render("group",{
        title: "Charts n Stuff"
    });
};