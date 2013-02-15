function convertDate(date) {
    var parts = date.split("/");

    var year = parts[0];
    var month = parts[1] - 1;
    var day = parts[2];

    return new Date(year, month, day);
}