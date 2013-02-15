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
    db.group(
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

exports.getTweetCount = getTweetCount;