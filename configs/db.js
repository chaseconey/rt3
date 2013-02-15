mongo = require( 'mongodb');

var db_host = "127.0.0.1",
  db_port = mongo.Connection.DEFAULT_PORT,
  db_db = "rt3",
  db_conn = new mongo.Db(db_db, new mongo.Server(db_host, db_port, {auto_reconnect: true})),
  db = db_conn.collection("tweets");

exports.db_conn = db_conn;
exports.db = db;