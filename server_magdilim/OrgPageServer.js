
/*
---------------------
    routering server into: /orgPage
*/

var express = require('express');
var router = express.Router(); // router
const bodyParser = require('body-parser');
const mysql = require('mysql');


router.use(bodyParser.json({extended: false}));

// ~~~~~~~~~~~~ DB ~~~~~~~~~
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'magdilimdb'
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


// ~~~~~~ API ~~~~~

  router.get('/', (req, res)=> 
    {
        try{
           
            // ctDb();
            console.log("in /orgPage")
            res.send({"value": "first router - Donte!", "massege": "sucsess"})
        }
        catch(err){
            res.end("err" , err.code);
        }
    });
}


module.exports = router;
