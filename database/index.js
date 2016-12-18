var mysql      = require('mysql');

var connection = null;

var database = new Object();
database.connect = function () {
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'wtf'
    });

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... nn");
        } else {
            console.log("Error connecting database ... nn");
        }
    });
}


database.que = function () {
    connection.query('SELECT * from skill LIMIT 2', function(err, rows, fields) {
        connection.end();
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.');
    });
}

database.findit = function(input,callback){
    connection.query('SELECT id FROM skill WHERE name=?',input,function(err,rows,fields){
        if(err)callback(err,null);
        connection.query('SELECT name FROM directed_graph join skill on id = node_to WHERE node_from=?',rows[0].id ,function(err1,rows1,fields1){
            connection.end();
            if (!err1)
                callback(null,rows1);
            else
                callback(err,null);
        });
    });
}

module.exports = database;