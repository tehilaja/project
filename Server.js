//import { signInButton, registerButton } from '../project-master/src/Clients/cognito_client';
const cognitoClient = require('./cognito_client');

//  --- CHANGES
// const cognitoClient = require('../project/cognito_client');

const cognitoServiceFile = require('./src/cognito/cognito.service');
const userRegistrationFile = require('./src/cognito/user-registration.service');
const userLoginFile = require('./src/cognito/user-login.service');
const userParametersFile = require('./src/cognito/user-parameters.service');
const awsServiceFile = require('./src/cognito/aws.service');
const cognitoUtil = cognitoServiceFile.data.cognitoUtil;
const userRestirationService = userRegistrationFile.data.userRegistrationService;
const userLoginService = userLoginFile.data.userLoginService;
const userParametersService = userParametersFile.data.userParametersService;
const awsUtil = awsServiceFile.data.awsUtil;
const reactor = require("./src/utilities/custom-event").data.reactor;


const express = require('express');
const app = express(); //library to shorten http requests

const mysql = require('mysql');
const bodyParser = require('body-parser');
var my_user = null
var pic = "https://yad-sarah.net/wp-content/uploads/2019/04/logoys.png"

//routering 
//const Donate = require('./DonateServer.js');

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

userLoginService.isAuthenticated(function(message, isLoggedIn) {
  console.log("AppComponent: the user is authenticated: " + isLoggedIn);
  cognitoUtil.getIdToken({
      callback() {

      },
      callbackWithParam(token) {
          // Include the passed-in callback here as well so that it's executed downstream
          console.log("AppComponent: calling initAwsService in callback")
          awsUtil.initAwsService(null, isLoggedIn, token);
      }
  });
})


// ~~~~~~~~~~~~~~~ routering ~~~~~~~~~~~~
// TODO: correct to /donate only!!!
//app.use('/OrgPage/donate',Donate);   


//-~~~~~~~~~~~~~~~~~~ code ~~~~~~~~~~~~~~~~~~

//-----add user ------
app.post('/add_user', function(req,res){
console.log("start signup....");
try {
  const response = userRestirationService.register(req.body.user);
  // res.send(response);
  res.send("success");
} catch (error) {
  console.log("error: "+JSON.stringify(error));  
}
  
  // // * change
  // let sql1 = `INSERT INTO Users ( user_name, first_name, last_name, pswd, email, credit_info_id, is_admin) VALUES ("${req.body.user_name}", "${req.body.first_name}", "${req.body.last_name}" ,"${req.body.pswd}", "${req.body.email}", 1, ${req.body.is_admin});`
  // console.log("quert is",sql1,"\n");
  // db.query(sql1)
  // console.log("in add_user")
  // res.send("added succesfully!") //response

  // // TODO : login for this user     
  //
});

//-----confirm registerd user ------
app.post('/confirm_registerd_user', function(req,res){
  console.log("start confirmation....");
  try {
    const response = userRestirationService.confirmRegistration(req.body.user_name, req.body.confirmation_code);
    res.send("confirmed");
  } catch (error) {
    console.log("error: "+JSON.stringify(error));  
  }
});


//-------login --------
app.post('/login',(req, res)=>{
  try {
    const response = userLoginService.authenticate(req.body.userName, req.body.pswd);
    console.log("in server log in success")
    res.send("loggedIn");
  } catch (error) {
    console.log("error: "+JSON.stringify(error));  
  }
  // console.log("login");
  // let query = `SELECT * FROM Users WHERE user_name="${req.body.userName}"`
  // db.query(query,(err,result,fields)=>{
  //   if(!err){
  //     console.log("found user")
  //     if(result.length && result[0].pswd==req.body.pswd){
  //       let resToSend={...result[0]}
  //       delete resToSend.pswd
  //       my_user = resToSend
  //       console.log("user: ", my_user.user_name)
  //       res.end("found user")
  //     }
  //     else return res.end("user dosent exist")
  //   }
  //   else
  //     res.send("fail")
  // })
})

//------------logout----------
app.post('/logout', function(req,res){
  my_user = null;
  console.log("in logout")
  res.send("logged out")
});


//--------------check if user is logged in -----------------
app.post('/is_logged_in', function(req,res){
  if (my_user == null)
    res.end("no user");
  else{
    console.log("in is logged. my_user: " + my_user.user_name)
    res.end(my_user.user_name)
  }
});

//---------------get user params--------------
app.post('/get_user_params',function(req,res){
  console.log("start server get user params");
  let params = [];
  userParametersService.getParameters(params);
  //while(!params.length);

  reactor.registerEvent('got_user_params');
  reactor.addEventListener('got_user_params', function() {
    res.send(params);
  });
   
});

//-------donation ----

app.post('/donation',(req, res)=>{
  
  // var userID = req.body.user_id
  console.log("the user: ", my_user)
  if(my_user !== null)
  {
    let id = 0 
    console.log("user", my_user.user_id)
    // let qDuser = `(select user_id from Users where user_name = "${req.body.referred_by}" );`
    // console.log("qDuser",qDuser )
    // db.query(qDuser,(err,result,fields)=>
    // {
    //   if(!err){
    //     console.log("add level")
    //     id = result[0].user_id
    //     console.log("id,",id)
    //   }
    //   else
    //     res.end("fail1")
    // console.log(result)
    // })

    // if(${req.body.referred_by}) // TODO: if no Referred to
      
    let queryD = `INSERT INTO Doners_in_org (user_id, org_id, monthly_donation, referred_by) VALUES (${my_user.user_id} , ${req.body.org_id}, ${req.body.monthly_donation},(select user_id from Users where user_name = "${req.body.referred_by}" ));`
    console.log("quert is",queryD,"\n")
    db.query(queryD,(err,result,fields)=>
    {
      if(!err){
        console.log("in donation")
        res.end("added succesfully!") //response
      }
      else
        res.end("fail2")
    console.log(result)
    })
  // })
  }
  else
    res.end("no conection")
})


// -- data 
app.get('/data', function(req, res, next) {
  db.query('select * from Organization', function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

// -- userProfile 
app.get('/userProfile ', function(req, res, next) {
  db.query(`SELECT * FROM Users WHERE user_name="${my_user.user_id}"`, function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});






//----------fetch organization data from data base-----------
app.post('/fetch_org_data',(req, res)=>{
  console.log("fetch_org_data");


  // let {query} = await stripe.charges.create({
  //   amount: 2000,
  //   currency: "usd",
  //   description: "An example charge",
  //   source: req.body
  // });

  // res.json({status});



  let query = `SELECT * FROM Organization`
  db.query(query,(err,result,fields)=>{
    if(!err){
      console.log("the query is: \n", query)
      console.log("found organizations")
      //check what result actually sends...
      console.log(result)
      // console.log(fields)

      console.log("type: ", typeof result)
      console.log("try json", JSON.stringify(result))

      // return res.json(result);
      res.end(JSON.stringify(result));
    }
    else
      res.send("failed to get org data")
  })
})

// -- NEW --
// -- addOrg --
app.post('/addOrg',(req, res)=>{
  
  console.log("the org:")
  if(my_user !== null)
  {
    let id = 0 
    console.log("user")
    // org_name: ,admin_name:,org_pic:this.state.photo, monthly_donation:this.state.minDonation,  // ---- req

    // TODO : real pic

    // let queryD = `INSERT INTO Doners_in_org (user_id, org_id, monthly_donation, referred_by) VALUES (${my_user.user_id} , ${req.body.org_id}, ${req.body.monthly_donation},(select user_id from Users where user_name = "${req.body.referred_by}" ));`

    let queryD = `INSERT INTO organization (org_name,admin_name,org_pic,min_donation) VALUES 
    ("${req.body.org_name}" , "${req.body.admin_name}","${pic}", ${req.body.monthly_donation} );`
    console.log("quert is",queryD,"\n")
    db.query(queryD,(err,result,fields)=>
    {
      if(!err){
        console.log("in add org")
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



//port for server
app.listen('5000', ()=>{
    console.log('app running on port 5000')
})
