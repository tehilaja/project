const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express(); //library to shorten http requests
var user = ""



///maybe- check loopback?

app.use(bodyParser.json({extended: false}))

console.log("connected")


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'magdilimdb'
});

db.connect((err)=>{
  if(err){
      console.log("my sql1 "+ err);
  }
  else
  console.log('mysql connected...');
});



//-~~~~~~~~~~~~~~~~~~ code ~~~~~~~~~~~~~~~~~~

//-----add user ------
app.post('/add_user', function(req,res){

  //todo- make sure email and user_name dosent exists.
  console.log("req",req.body);
  // * change
  let sql1 = `INSERT INTO Users ( user_name, first_name, last_name, pswd, email, credit_info_id, is_admin) VALUES ("${req.body.user_name}", "${req.body.first_name}", "${req.body.last_name}" ,"${req.body.pswd}", "${req.body.email}", 1, ${req.body.is_admin});`
  console.log("quert is",sql1,"\n");
  db.query(sql1)
  console.log("in add_user")
  res.send("added succesfully!") //response

  // TODO : login for this user 
});

//-------login --------
app.post('/login',(req, res)=>{
  let query = `SELECT * FROM Users WHERE user_name="${req.body.userName}"`
  console.log("req body",req.body)
  db.query(query,(err,result,fields)=>{
    if(!err){
      console.log("found user")
      if(result.length && result[0].pswd==req.body.pswd){
        let resToSend={...result[0]}
        delete resToSend.pswd
        console.log(resToSend)
        user = resToSend
        console.log("user", user.user_name)
        res.end("found user")
      }
      else return res.end("user dosent exist")
    }
    else
      res.send("fail")
  console.log(result)})
})

//------------logout----------
app.post('/logout', function(req,res){
  user = "";
  res.send("logged out")
});


//--------------check if user is logged in -----------------
app.post('/is_logged_in', function(req,res){
  console.log("in is logged")
  if (user == "")
    res.end("no user")
  res.send(user.user_name)
});

//-------donation ----

app.post('/donation',(req, res)=>{
  
  // var userID = req.body.user_id
  console.log("the user: ", user)
  if(user != "")
  {
    let id = 0 
    console.log("user", user.user_id)
    let qDuser = `(select user_id from Users where user_name = "${req.body.referred_by}" );`
    console.log("qDuser",qDuser )
    db.query(qDuser,(err,result,fields)=>
    {
      if(!err){
        console.log("add level")
        id = result[0].user_id
        console.log("id,",id)
      }
      else
        res.end("fail")
    console.log(result)
    })

    let queryD = `INSERT INTO Donersinorg (user_id, org_id, monthly_donation, leveled, referred_by) VALUES (${user.user_id} , ${req.body.org_id}, ${req.body.monthly_donation}, ${req.body.level},(select user_id from Users where user_name = "${req.body.referred_by}" ));`
    console.log("quert is",queryD,"\n")
    db.query(queryD,(err,result,fields)=>
    {
      if(!err){
        console.log("in donation")
        res.end("added succesfully!") //response
      }
      else
        res.end("fail")
    console.log(result)
    })
  // })
  }
  else
    res.end("no conection")
})










// app.post('/donation',(req, res)=>{
  
//   // var userID = req.body.user_id
//   console.log("the user: ", user)
//   if(user != "")
//   {
//     console.log("user", user.user_id)
//     let queryD = `INSERT INTO Donersinorg (user_id, org_id, monthly_donation, leveled, referred_by) VALUES (${user.user_id} , ${req.body.org_id}, ${req.body.monthly_donation}, ${req.body.level},(select user_id from Users where user_name = "${req.body.referred_by}" ));`
//     console.log("quert is",queryD,"\n")
//     db.query(queryD,(err,result,fields)=>
//     {
//       if(!err){
//         console.log("in donation")
//         res.end("added succesfully!") //response
//       }
//       else
//         res.end("fail")
//     console.log(result)
//     })
//   // })
//   }
//   else
//     res.end("no conection")
// })
  
  

// insert into Donersinorg (user_id, org_id, monthly_donation, leveled, referred_by) values (5, 1, 12, 1, (select user_id from Users where user_name = "elchanan" ));




// app.post('/donation',(req, res)=>{
  
//   // var userID = req.body.user_id
//   console.log("the user: ", user)
//   if(user != "")
//    {
//       console.log("user", user.user_id)
//       let queryD = `INSERT INTO Donersinorg (user_id, org_id, monthly_donation, leveled, referred_by) VALUES (${user.user_id} , ${req.body.org_id}, ${req.body.monthly_donation}, ${req.body.level},(select user_id from Users where user_name = "${req.body.referred_by}" ));`
//       //  "${req.body.referred_by}" 
//       // todo : check referred_by exist
//       console.log("quert is",queryD,"\n");
//       db.query(queryD)
//       console.log("in donation")
//       res.end("added succesfully!") //response
//    }
//   else
//     res.end("no conection")
// })



//------------- ??? -------
 //---findDuser ---
 app.post('/findDuser',(req, res)=>{
   console.log(req.body.userD)
  let query = `SELECT * FROM Users WHERE user_name="${req.body.userD}"`
  console.log("req body",req.body)
  console.log(query)
  db.query(query,(err,result,fields)=>{
    if(!err){
      console.log("found user " + result[0].user_id)
      res.end((result[0].user_id).toString())
     
    }
    else
      res.end("fail")
  console.log(result)})
})



/*
 app.get('/abc', (req, res)=>{
    console.log("hello");
    let sql1 = 'SELECT * FROM student';
    let qury1 = db.query(sql1, (err, result)=>{
        if(err) console.log("my sql3 "+ err);
            console.log(result);
            res.send('database1 connected...');
    });
    //let sql = 'CREATE DATABASE abc';
    //console.log("my database "+ sql1);
    // db.query(sql, (err, result)=>{
    //     if(err) console.log("my sql2 "+ err);
    //     res.send('database connected...');
    // })
});

app.post('/userExist', function(req, res) {
    // Get sent data.
    var user = req.body;
    //define user type
    var admin_flag; //definning user type in order to know what table to check existance
    if(user.isAdmin)
      admin_flag = true;
    }
      console.log("username: ", user.userName, " pswd: ", user.pswd, " isAdmin: ", user.isAdmin)
    // Do a MySQL query.
    var sql = 'SELECT username, password FROM ' + users + ' WHERE username = "'+user.userName+'" and pswd = "'+user.pswd+'"'
    console.log("QUERY: ", sql)
    var query = db.query(sql, function(err, result) {
      // check result
      console.log("result-userExist: ",result)

      if(result.length === 0){//if student doesn't exist in the system
        console.log("userExist- failed..")
        res.end('Failed');
      }
      else{
        console.log("RESULT IS -userExist",result,err);
        console.log("userExist - success....")
        res.end('Success');

      }
    });
    console.log("hello ..."+ query);
  });
  
  //-----------------------------------------------------
  app.post('/return_user_name', function(req, res) {
    console.log("hello return_user_name")
    // Get sent data.
    var user = req.body
    var user_type = user.type
    if(user_type === undefined){
      console.log("return_user_name - no type")
      res.end("no_type")
    }
    console.log("username: ", user.username, " pwd: ", user.password, " type: "+ user.type)
    // Do a MySQL query.
    var sql = 'SELECT FirstName, LastName FROM ' + user_type + ' WHERE username = "'+user.username+'" and password = "'+user.password+'"'
    console.log("QUERY: ", sql)
    // Do a MySQL query.
    var query = db.query(sql, function(err, result) {
      // check result
      //console.log("result-return_user_name: ",result)

      if(result.length === 0){//if student doesn't exist in the system
        console.log("return_user_name - failed..")
        res.end('Failed');
      }
      else{
        console.log("RESULT IS - return_user_name ",result,err);
        console.log("return_user_name - success....")
        res.send(result[0]);//result comes as an array

      }
    });
  });

  //-------------------------------------------------------------
  app.post('/return_course_data_per_student', function(req, res) {
    console.log("hello return_course_data_per_student")
    var course_name_arr = []
    var count_course // in order to send a response only after getting all queries results
    // Get sent data.
    var user = req.body
    // Do a MySQL query.
    var active_course_code = 'select distinct Active_Course_code from lab_meeting where StudentCode = '+ user.password
    // Do a MySQL query.
    var query = db.query(active_course_code, function(err, result1) {
      // check result
      console.log("result1: ",result1)
      count_course = result1.length
      if(result1.length === 0){//if student isnt signed up to any courses
        console.log("return active code course - failed..")
        res.end('Failed');
      }
      else{
        for(var i = 0; i < result1.length; i++){
          var code_course = 'select CourseCode from active_course where Active_Course_code = ' + result1[i].Active_Course_code;
          // Do a MySQL query.
          var query_course_code = db.query(code_course, function(err, result2) {
            console.log("RESULT 2 IS - return code course ",result2,err);
            if(result2.length === 0){//if query failed
              console.log("return_code course - failed..")
              res.end('Failed');
            }
            else{
              var course_name = 'select CourseName from courses where Course_code = ' + result2[0].CourseCode;
              var query_course_code = db.query(course_name, function(err, result3) {
                console.log("RESULT 3 IS - return_course name ",result3,err);
                if(result3.length === 0){//if query failed
                  console.log("return_= course name - failed..")
                  res.end('Failed');
                }
                else{
                  course_name_arr.push(result3[0].CourseName)//adding course to aourses array
                  count_course -- //counting how many results have returned
                  if(count_course === 0)// if all data was returned
                    res.end(course_name_arr.toString())// returning string of studet's courses to client
                }
              });
            }
          });
        }  
      }
    });
  });

 */ 
//port for server
app.listen('5000', ()=>{
    console.log('app running on port 5000')
})
