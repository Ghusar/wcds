var mysql      = require('mysql');
var trie = require('./trie');
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
    //console.log(input+"input");
    connection.query('SELECT id FROM skill WHERE name=?',input,function(err,rows,fields){
        console.log(rows);
        if(err){
            console.log(err);
            callback(err,null);}
        else {
            console.log("aya");
            connection.query('SELECT name FROM directed_graph join skill on id = node_to WHERE node_from=?', rows[0].id, function (err1, rows1, fields1) {
                if (!err1)
                    callback(null, rows1);
                else
                    callback(err, null);
            });
        }
    });
}

database.insertTrie = function () {
    connection.query('SELECT name FROM skill',function(err,rows,fields) {
        if(err)console.log("err");
        else{
            for(var i = 0;i<rows.length;i++){
                trie.add(rows[i].name);
            }
        }

    });

}

database.getTrie = function (query) {
    return trie.searchdec(query);
}





module.exports = database;