$(document).ready(function() {
    getChartData();

    //Refresh chart every hour
    setInterval(function() {
        getChartData();
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
        counter = ul.find("li").length;

    socket.on('tweet', function (tweet) {
        tweetHtml = "<li class='cf'><img src='" + tweet.profile_url + "'/><p>" + tweet.user_name + " - " + tweet.tweet_text + "</p></li>";
        ul.prepend(tweetHtml);

        if (counter > 8) {
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
    var data = [],
        d;

    //format the data into a data array
    for(var i in results) {
        d = convertDate(results[i].date);
        data.push( [parseInt(d.getTime(), 10), results[i].sum] );
    }
    //Set some options for the graph
    options = {
        series: {
            lines: { show: true },
            points: { show: true }
        },
        color: '#00d6e2',
        yaxis: {
            mode: "number",
            tickSize: 1000
        },
        xaxis:
        {
            mode: 'time',
            timeformat: "%m/%d"
        }
    };
    //Data must be formatted this way
    data = [ data ];
    $.plot($("#ajax"), data, options);
}