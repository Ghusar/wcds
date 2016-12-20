var express = require('express');
var router = express.Router();
var database = require('../database/index');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/data',function (req,res) {

      database.findit(req.body.input,function (err,data) {
            console.log(data);
            res.send({data:data});

      });
});

router.post('/search',function (req,res) {
    var textQuery = database.getTrie(req.body.input);
    //console.log(textQuery);
    res.send({data:textQuery});
});

module.exports = router;
