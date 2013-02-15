$(document).ready(function() {
    initClick();
});

function initClick() {
        $("#connect").on("click", function(e) {
        socket.socket.reconnect();
    });
    $("#disconnect").on("click", function(e) {
        socket.disconnect();
    });
}

function convertDate(date) {
    var parts = date.split("/");

    var year = parts[0];
    var month = parts[1] - 1;
    var day = parts[2];

    return new Date(year, month, day);
}