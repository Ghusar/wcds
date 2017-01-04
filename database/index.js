var mysql      = require('mysql');
var trie = require('./trie');
var connection = null;

var database = new Object();
database.connect = function () {
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'wcds'
    });

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... nn");
        } else {
            console.log("Error connecting database ... nn");
        }
    });


}

database.StoreDataInDatabase = function(){
    var fs = require('fs');
    fs.readFile("DataOfDatabase.txt", 'utf8', function(err, data) {
        if (err) throw err;
        var array=data.split(";");
        for(var i=0;i<array.length-1;i++){
            //console.log(array[i]);
            connection.query(array[i]+";",function(err,rows) {
                if (err) {
                    console.log('done');
                }
            });
        }
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