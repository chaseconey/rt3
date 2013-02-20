var db = require(__dirname + '/../configs/db');

var getTweetCount = function(numDays, callback) {
    var thisDate,
        dateVal,
        now = new Date(),
        daysAgo = new Date();
        
    daysAgo.setDate(now.getDate() - numDays);
    
    db.db.aggregate([
        {$match: {
            created: {"$gte": daysAgo}
        }},
        {$project: {
            day_joined: {
                $dayOfMonth: "$created"
            }
        }},
        {$group: {
            _id: "$day_joined",
            count: {$sum: 1}
        }}
    ],
    callback);
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

    db.db.aggregate([
        {$match: {
            created: {"$gte": daysAgo}
        }},
        {$project: {
            tags: "$entities.hashtags.text"
        }},
        {$unwind: "$tags"},
        {$group: {
            _id: "$tags",
            count: {$sum: 1}
        }},
        {$sort: {
            count: -1
        }},
        {$limit: 20 }
    ],
    callback);
};

exports.getTweetCount = getTweetCount;
exports.getAllTweets = getAllTweets;
exports.getTweetHashtags = getTweetHashtags;