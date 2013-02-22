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
            dayCreated: {
                $dayOfMonth: "$created"
            }
        }},
        {$group: {
            _id: "$dayCreated",
            count: {$sum: 1}
        }}
    ],
    callback);
};

var getTweetCountByHour = function(numDays, callback) {
    var thisDate,
        dateVal,
        now = new Date(),
        daysAgo = new Date();
        
    daysAgo.setDate(now.getDate() - numDays);
    
    db.db.aggregate([
        {$match: {
            created: {"$gt": daysAgo}
        }},
        {$project: {
            hourCreated: {
                $hour: "$created"
            },
            dayCreated: {
                $dayOfMonth: "$created"
            }
        }},
        {$group: {
            _id: {
                day: "$dayCreated",
                hour: "$hourCreated"
            },
            count: {$sum: 1}
        }},
        {$sort: {
            _id: 1
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
        {$limit: 40 }
    ],
    callback);
};

exports.getTweetCount = getTweetCount;
exports.getTweetCountByhour = getTweetCountByHour;
exports.getAllTweets = getAllTweets;
exports.getTweetHashtags = getTweetHashtags;