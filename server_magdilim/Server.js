//import { signInButton, registerButton } from '../project-master/src/Clients/cognito_client';
const cognitoClient = require('./cognito_client');

//  --- CHANGES
// const cognitoClient = require('../project/cognito_client');

// const cognitoServiceFile = require('./src/cognito/cognito.service');
// const userRegistrationFile = require('./src/cognito/user-registration.service');
// const userLoginFile = require('./src/cognito/user-login.service');


// ~~~~~~~~~~~ cognito ~~~~~~~~~~~~
const cognitoServiceFile = require('./cognito/cognito.service');
const userRegistrationFile = require('./cognito/user-registration.service');
const userLoginFile = require('./cognito/user-login.service');
const userParametersFile = require('./cognito/user-parameters.service');
const awsServiceFile = require('./cognito/aws.service');



const cognitoUtil = cognitoServiceFile.data.cognitoUtil;
const userRestirationService = userRegistrationFile.data.userRegistrationService;
const userLoginService = userLoginFile.data.userLoginService;

const userParametersService = userParametersFile.data.userParametersService;
const awsUtil = awsServiceFile.data.awsUtil;
const reactor = require("./utilities/custom-event").data.reactor;


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express');
const app = express(); //library to shorten http requests

const mysql = require('mysql');
const bodyParser = require('body-parser');

var my_user = null
var pic = "https://yad-sarah.net/wp-content/uploads/2019/04/logoys.png"

//routering 
// const OrgPage = require('./OrgPageServer.js');




///maybe- check loopback?
app.use(bodyParser.json({extended: false}))

console.log("connected")

//  ~~~~~~~~~~~~~~~~~~~~~~ DB ~~~~~~~~~~~~~~~~~~~
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

// ~~~~~~~~~~ userLoginService ~~~~~~~
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

// app.use('/orgPage',OrgPage);   

// -->  http://localhost:3000/donate


// ~~~~~~~~~~ get org info ~~ (from: orgPage)
// TODO: routering

// @ ~~~~~~~~~~~~~~~~~ new 05.05.20 ~~~~~~~~~~~~

// --/orgPage/:orgId 
app.get('/orgPage/:orgId', (req, res,next)=> 
{
  try{
    // TODO : try the db multi connection problem
    // conectDb();
    console.log("in /orgPage")
    console.log("id: " + req.params.orgId)
 
    const qO = `select * from Organization WHERE org_id="${req.params.orgId}"`;
    console.log("query: " + qO);
    db.query(qO, (err,result, fields) =>{
      if(err) throw error;
      if (result.length == 0 )
        res.send("no data")
      else{
        console.log("res:  j" +JSON.stringify(result));
        // console.log(result[0])
        // console.log(result[0].min_donation)


        // res.send(JSON.stringify(result));
        res.send(result[0]);
      }
    });
  }
  catch(err){
    console.log("erroe " + err.code);
    res.end("err" , err.code);
  }
});


// -- /donate/findDThrouhUser
app.get('/donate/findDThrouhUser/:dUser', (req, res,next)=> 
{
  try
  {
    console.log("in donate/findDThrouhUser/:dUser")
    const qDUser = `select user_id from users where email ="${req.params.dUser}"`;
    console.log("query: \n" + qDUser + "\n");
    db.query(qDUser, (err,result, fields) =>{
    if(err) throw error;
    if (result.length == 0)
      res.send("no data")
    else{
      console.log("res:  " +result[0].user_id);
      res.send(JSON.stringify(result[0]));
    }
    });
  }
  catch(err){
    console.log("erroe " + err.code);
    res.end("err" , err.code);
  }
});


// ~~~~~~~~~~~ check giv a object 
// -> ~~~ donate process

// check which details exsist and do a query
function checkDonateDetails(paramO)
{
  // user_id, org_id, monthly_donation, referred_by,d_title, d_description,is_anonim,status_id
  var q = ` INSERT INTO doners_in_org (`
  var insertinfValue = `)VALUES(`

  // neccesery
    // TODO: check if the neccesery value input? -> before?
 
  q += `user_id,org_id,monthly_donation`;
  insertinfValue += ` ${paramO.user_id},${paramO.org_id},${paramO.monthly_donation}`

  // --- check
  if(paramO.referred_by!=''){
    q += `,referred_by`;
    insertinfValue += `,${paramO.referred_by}`;
  }
  if(paramO.d_title!=''){
    q += `,d_title`;
    insertinfValue += `,"${paramO.d_title}"`;
  }
  if(paramO.d_description!=''){
    q += `,d_description`;
    insertinfValue += `,"${paramO.d_description}"`;
  }
  // nessecery
  
  q += `,is_anonim,status_id`;
  insertinfValue += `,${paramO.is_anonim},1);`

  const query = q + insertinfValue;
  console.log("param (in fun) \n" + query);

  return query
}

// ~~~~~~~~~~~~ post:  /checkObject --> donate ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.post('/donationProcess', (req, res,next)=>
{
  try
  {
    console.log("in /donationProcess \n ")

    // let queryD = `INSERT INTO Doners_in_org (user_id, org_id, monthly_donation, referred_by) VALUES (${my_user.user_id} , ${req.body.org_id}, ${req.body.monthly_donation},(select user_id from Users where user_name = "${req.body.referred_by}" ));`
    
    // let qDonate = ` INSERT INTO doners_in_org SET ?', ${JSON.stringify(req.body)}`
      //  ${req.body.is_admin });`

    
    const qDonate = checkDonateDetails(req.body) ;// check details
    console.log("quert is",qDonate,"\n");

    db.query(qDonate,(err,result,fields)=>
    {
      if(!err){
        res.send("insert donation") ;//response
        console.log("sucses! ");
      }
      else
        res.send("db fail");
        console.log("fail db "+ err.code);
    // console.log("result " + result);
    })
    // console.log("in check \n")
    // console.log("string obj \n "+ JSON.stringify(req.body));
  }
  catch(err){
    console.log("erroe " + err.code);
    res.end("err server " , err.code)
  }
});


// @ ~~~~~~~~~~~~~~~~~~~~~~~~~~~


// -- userProfile 
app.get('/userProfile ', function(req, res, next) {
  db.query(`SELECT * FROM Users WHERE user_name="${my_user.user_id}"`, function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});



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


// @ check server connection
app.get('/checkServer',function(req,res){
  console.log("checkServer !!! ....");
  try {
    res.send("yes");
  } catch (error) {
    console.log("error: "+JSON.stringify(error));  
    res.send("no")
  }

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
app.post('/logout', function(req,res) {
  userLoginService.logout();
  res.send("logged out");
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


//---------------get current user--------------
app.post('/get_current_user',function(req,res){
  console.log("get current user: "+ JSON.stringify(cognitoUtil.getCurrentUser()))
  res.send(cognitoUtil.getCurrentUser())
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

// app.post('/donation',(req, res)=>{
  
//   // var userID = req.body.user_id
//   console.log("the user: ", my_user)
//   if(my_user !== null)
//   {
//     let id = 0 
//     console.log("user", my_user.user_id)
//     // let qDuser = `(select user_id from Users where user_name = "${req.body.referred_by}" );`
//     // console.log("qDuser",qDuser )
//     // db.query(qDuser,(err,result,fields)=>
//     // {
//     //   if(!err){
//     //     console.log("add level")
//     //     id = result[0].user_id
//     //     console.log("id,",id)
//     //   }
//     //   else
//     //     res.end("fail1")
//     // console.log(result)
//     // })


//     // if(${req.body.referred_by}) // TODO: if no Referred to
      
//     let queryD = `INSERT INTO Doners_in_org (user_id, org_id, monthly_donation, referred_by) VALUES (${my_user.user_id} , ${req.body.org_id}, ${req.body.monthly_donation},(select user_id from Users where user_name = "${req.body.referred_by}" ));`
//     console.log("quert is",queryD,"\n")
//     db.query(queryD,(err,result,fields)=>
//     {
//       if(!err){
//         console.log("in donation")
//         res.end("added succesfully!") //response
//       }
//       else
//         res.end("fail2")
//     console.log(result)
//     })
//   // })
//   }
//   else
//     res.end("no conection")
// })


// -- data 
app.get('/data', function(req, res, next) {
  db.query('select * from Organization', function (error, results, fields) {
      if(error) throw error;
      res.send(JSON.stringify(results));
  });
});

// -- userProfile 
app.get('/userProfile ', function(req, res, next) {
  db.query(`SELECT * FROM Users WHERE user_name="${my_user.user_id}"`, function (error, results, fields) {
      if(error) throw error;
      // res.send(JSON.stringify(results));
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
