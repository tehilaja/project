
/*
---------------------
    routering server into: /donate
*/

var express = require('express');
var router = express.Router(); // router
const bodyParser = require('body-parser');
const mysql = require('mysql');


router.use(bodyParser.json({extended: false}));

// ~~~~~~~~~~~~ DB 
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'my_db'
  })

function conectDb()
{
    db.connect((err)=>{
    if(err){
        console.log("my sql1 "+ err);

    }
    else
    console.log('mysql connected...');
  });
}

  router.get('/', (req, res)=> 
    {
        try{
            // TODO : try the db multi connection problem
            // conectDb();
            res.send({"value": "first router - Donte!"})
        }
        catch(err){
            res.end("err" , err.code);
        }
    });

module.exports = router;
