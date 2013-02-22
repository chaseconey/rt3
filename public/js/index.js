$(document).ready(function() {
    getChartData();
    getHashtagData();

    //Refresh chart every hour
    setInterval(function() {
        getChartData();
        getHashtagData();
    }, 60 * 60 * 1000);
});

/**
 * These are the two ways to connect and reconnect to sockets
 */
function initClick() {
    $("#connect").on("click", function(e) {
        socket.socket.reconnect();
    });
    $("#disconnect").on("click", function(e) {
        socket.disconnect();
    });
}

/**
 * Functionality for keeping the 10 minute chart updating. Fires on tweetCountUpdate event (socketIO)
 */
(function() {
    var socket = io.connect('http://localhost'),
        dataArr = [],
        yVal = 0,
        xVal = 0,
        plot = $.plot( $("#realtime"), [[],[]], {xaxis:{mode: 'time'}});
    socket.on('tweetCountUpdate', function (data) {
        xVal = new Date();
        yVal = data.tweetCount;
        dataArr.push([ xVal, yVal ]);

        //Only keep 10 points
        if(dataArr.length > 10) {
            dataArr.shift();
        }

        //Update the chart
        plot.setData([dataArr]);
        plot.setupGrid();
        plot.draw();
    });

    //Update the tweets real time
    var ul = $("ul#tweets"),
        counter = ul.children("li").length,
        tweetHtml = '';

    socket.on('tweet', function (tweet) {
        tweetHtml = '';
        tweetHtml += "<li><div class='media'>";
        tweetHtml += "<img class='pull-left' src='" + tweet.profile_url + "'/>";
        tweetHtml += "<div class='media-body'>";
        tweetHtml += "<h4 class='media-heading'>" + tweet.user_name + "</h4>";
        tweetHtml += "<div class='media'>" + tweet.tweet_text + "</div></div></li>";

        ul.prepend(tweetHtml);

        if (counter >= 8) {
            ul.children("li").last().remove();
        } else {
            counter++;
        }
    });
})();

/**
 * Updating the 7 day graph ajax functionality
 */
function getChartData(){
    var url = '/tweets/count';
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json'
    }).done(plotField);
}

function plotField(results) {
    var data = [];

    //format the data into a data array
    for(var i in results) {
        data.push( [results[i]._id, results[i].count] );
    }
    //Set some options for the graph
    options = {
        series: {
            lines: { show: true },
            points: { show: true }
        },
        hoverable: true,
        color: '#00d6e2',
        yaxis: {
            mode: "number",
            tickSize: 1000
        },
        xaxis: {
            minTickSize: 1
        }
    };
    //Data must be formatted this way
    data = [ data ];
    $.plot($("#ajax"), data, options);
}

function getHashtagData() {
    var url = '/tweets/hashtags';
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json'
    }).done(insertHashtags);
}

function insertHashtags(results) {
    var ul = $("ul#tagList"),
        li,
        count;
    //clear out list before re-creating
    ul.empty();
    for(var i in results) {
        li = $("<li>");
        li.text(results[i]._id);

        count = results[i].count;
        li.css("fontSize", (count / 100 < 2) ? ((count / 100) + 1) + "em": "2em" );

        //add to list
        li.appendTo("#tagList");

    }

}