var mysql = require('mysql');
var config = require('../config/config.js')
module.exports = {
    connectServer() {
        var client = mysql.createConnection({
            host: config.host,
            user: config.user,
            port: config.port,
            password: config.password,
            database: config.database
        })
        return client;
    }
}