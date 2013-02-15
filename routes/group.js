/*
 * GET group test page.
 */

var db = require(__dirname + '/../configs/db');

exports.index = function(req, res){
	var thisDate,
		dateVal,
		now = new Date(),
		sevenDaysAgo = new Date();
		
	sevenDaysAgo.setDate(now.getDate() - 7);
	/**
	 * Good example: http://stackoverflow.com/questions/3428246/executing-mongodb-query-in-node-js
	 */
	db.group(
		//fields to group on (doesn't have to be a function)
		function(doc) {
			thisDate = doc.created;
			dateVal = thisDate.getFullYear() + "/" + parseInt(thisDate.getMonth()+1, 10) + "/" + thisDate.getDate();
			return {"date": dateVal};
		},
		//condition
		{"created": {"$gte" : sevenDaysAgo }},
		//initial values used
		{
			sum: 0
		},
		//reduce function
		function(doc, prev) { prev.sum += 1; },
		//true for group all (always true)
		true,
		//results function
		function(err, results) {
			res.render("group",{
				results: results,
				title: "Charts n Stuff"
			});
		}
	);

	

};