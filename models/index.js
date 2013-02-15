var db = require(__dirname + '/../configs/db');

var getTweetCount = function(numDays, callback) {
    var thisDate,
        dateVal,
        now = new Date(),
        daysAgo = new Date();
        
    daysAgo.setDate(now.getDate() - numDays);
    /**
     * Good example: http://stackoverflow.com/questions/3428246/executing-mongodb-query-in-node-js
     */
    db.db.group(
        //fields to group on (doesn't have to be a function)
        function(doc) {
            thisDate = doc.created;
            dateVal = thisDate.getFullYear() + "/" + parseInt(thisDate.getMonth()+1, 10) + "/" + thisDate.getDate();
            return {"date": dateVal};
        },
        //condition
        {"created": {"$gte" : daysAgo }},
        //initial values used
        {
            sum: 0
        },
        //reduce function
        function(doc, prev) { prev.sum += 1; },
        //true for group all (always true)
        true,
        //results function
        callback
    );
};

var getAllTweets = function(callback) {
    var thisDate,
        dateVal,
        now = new Date(),
        daysAgo = new Date();
        
    daysAgo.setDate(now.getDate() - 2);
    db.db.find({"created": {"$gte": daysAgo}}, callback);
};

/**
 * Count the number of distinct hashtags over a certain time period (in days).
 * Uses the new aggregation functionality in mongo 2.2
 */
var getTweetHashtags = function(numDays, callback) {
    var thisDate,
        dateVal,
        now = new Date(),
        daysAgo = new Date();
        
    daysAgo.setDate(now.getDate() - numDays);
    db.db.aggregate(
        { $project :
            { text : 1, tags : 1 }
        },
        { $unwind : "$tags" },
        callback
    );
};

exports.getTweetCount = getTweetCount;
exports.getAllTweets = getAllTweets;
exports.getTweetHashtags = getTweetHashtags;