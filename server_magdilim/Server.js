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
const s3Util = require('./utilities/s3-utilities.js').methods;
const reactor = require("./utilities/custom-event").data.reactor;
const statusCache = require('./utilities/status-cache');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express');
const app = express(); //library to shorten http requests

const mysql = require('mysql');
const bodyParser = require('body-parser');

const sendEmail = require('./utilities/email').methods.sendEmail;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
var pic = "https://yad-sarah.net/wp-content/uploads/2019/04/logoys.png"

//routering 
// const OrgPage = require('./OrgPageServer.js');




///maybe- check loopback?
app.use(bodyParser.json({ extended: false }))

console.log("connected")

//  ~~~~~~~~~~~~~~~~~~~~~~ DB ~~~~~~~~~~~~~~~~~~~
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'magdilimdb'
});

db.connect((err) => {
  if (err) {
    console.log("my sql1 " + err);
  }
  else
    console.log('mysql connected...');
});

statusCache.setCache(db, () => {
  console.log(`\n\n\norg 1 before anything:\n` + JSON.stringify(statusCache.getOrgTree(1)));
  // statusCache.addDonerToOrg('anotherid@id.com', 1, 3000, 'someid@id.com');
  // console.log(`\n\n\norg 1 after adding:\n`+JSON.stringify(statusCache.getOrgTree(1)));
  // statusCache.updateDonerInOrg('someotherid@id.com', 1, 80, 500);
  // console.log(`\n\n\norg 1 after updating:\n`+JSON.stringify(statusCache.getOrgTree(1)));
  // statusCache.updateLevelInOrg(1, {"org_id":1,"level_num":4,"level_name":"כסף","min_sum":3000});
  // console.log(`\n\n\norg 1 after updating level:\n`+JSON.stringify(statusCache.getOrgTree(1)));
  // statusCache.getGiftsReceivers(db, (giftReceivers) => {
  //   console.log('gift receivers: '+JSON.stringify(giftReceivers));
  //   });

});


// ~~~~~~~~~~~~~~~~~~~ scheduled jobs ~~~~~~~~~~~~~~~~~
const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule;
rule.minute = 0;
rule.hour = 0;

const job = schedule.scheduleJob(rule, function () {
  console.log(`The time is: ${new Date()}`);
  statusCache.setCache(db, () => {
    statusCache.getGiftsReceivers(db, (giftReceivers) => {

      Object.keys(giftReceivers).forEach(gift_id => {
        const query = `SELECT g.gift_name, g.gift_description, g.gift_pic, o.org_name FROM Gifts g INNER JOIN Organizations o WHERE gift_id=${gift_id}`;
        db.query(query, (err, result, fields) => {
          if (err) throw err;
          const gift = result[0];

          sendEmail(
            giftReceivers,
            null,
            null,
            'Congratualtions! You won a prize through Magdilim!',
            `We are happy to tell you you won a prize from ${gift.org_name}.\n\nThe prize you won: ${gift.gift_name}.\nDescription:${gift.gift_description}\n\nWe are very gratefull to you for your donations which help keep our important organizations going.\n\nYours, the Magdilim team`,
            [{path: gift.gift_pic, filename: gift.gift_pic.substr(gift.gift_pic.lastIndexOf('_')+1)}]
            );
        });
        
      })

      console.log('gift receivers: ' + JSON.stringify(giftReceivers));
    });
  });
});


// ~~~~~~~~~~ userLoginService ~~~~~~~
userLoginService.isAuthenticated(function (message, isLoggedIn) {
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



/* ~~~~ lastDonation 
  14.05
*/

/* SELECT d.user_id, d.org_id, u.user_name ,d.d_title,d.d_description, d.is_anonim,d.d_date, d.referred_by, o.img_url FROM Doners_in_org d 
INNER JOIN users u ON u.user_id = d.user_id 
INNER JOIN organizations o ON o.org_id = d.org_id
 ORDER BY d_date DESC LIMIT 20
 */

// TODO: make in prochedure?
app.get('/lastDonation', (req, res, next) => {
  try {
    // const qLDonation = `SELECT d.user_id, d.org_id, u.user_name ,d.d_title,d.d_description, d.is_anonim,d.referred_by, d.d_date, o.img_url FROM Doners_in_org d 
    //   INNER JOIN users u ON u.user_id = d.user_id 
    //   INNER JOIN organizations o ON o.org_id = d.org_id
    //   ORDER BY d_date DESC LIMIT 20`;
    const qLDonation = `SELECT d.user_id, d.org_id, d.d_title,d.d_description, d.anonymous,d.referred_by, d.d_date, o.img_url,o.org_name FROM Doners_in_org d 
      INNER JOIN organizations o ON o.org_id = d.org_id
      ORDER BY d_date DESC LIMIT 20;`
    //d.referred_by,
    console.log("query: " + qLDonation);
    db.query(qLDonation, (err, result, fields) => {
      if (err) throw err;
      if (result.length === 0)
        res.send("no data")
      else {
        console.log("res:" + JSON.stringify(result));
        // res.send(JSON.stringify(result));
        res.send(result);
      }
    });
  }
  catch (err) {
    console.log("erroe " + err.code);
    res.end("err", err.code);
  }
});

// ~~~ 30.05 ~~
app.get(`/orgPage/get_org_field_of_activity/:orgId`, (req, res, next) => {
  try {
    // TODO : try the db multi connection problem
    // conectDb();
    console.log("in /orgPage")
    console.log("id: " + req.params.orgId)

    const q_org_field_name = 
      `select f.field_name
      from Org_field_of_activity o
        inner join Fields_of_activity f ON o.field_id = f.field_id
      where o.org_id ="${req.params.orgId}";`

    console.log("query: \n" + q_org_field_name);
    db.query(q_org_field_name, (err, result, fields) => {
      if (err) throw err;
      if (result.length == 0)
        res.send("no data")
      else {
        console.log("res:\n " + JSON.stringify(result));
        // console.log(result[0])
        // console.log(result[0].min_donation)


        // res.send(JSON.stringify(result));
        res.send(result);
      }
    });
  }
  catch (err) {
    console.log("erroe " + err.code);
    res.end("err", err.code);
  }

});


// @ ~~~~~~~~~~~~~~~~~ new 05.05.20 ~~~~~~~~~~~~

// --/orgPage/:orgId 
app.get('/orgPage/:orgId', (req, res, next) => {
  try {
    // TODO : try the db multi connection problem
    // conectDb();
    console.log("in /orgPage")
    console.log("id: " + req.params.orgId)

    const qO = `select * from Organizations WHERE org_id="${req.params.orgId}"`;
    console.log("query: " + qO);
    db.query(qO, (err, result, fields) => {
      if (err) throw err;
      if (result.length === 0)
        res.send("no data")
      else {
        console.log("res org info: \n" + JSON.stringify(result));
        // console.log(result[0])
        // console.log(result[0].min_donation)


        // res.send(JSON.stringify(result));
        res.send(result[0]);
      }
    });
  }
  catch (err) {
    console.log("erroe " + err.code);
    res.end("err", err.code);
  }
});

//--------------upload file-----------------
app.post('/upload-file', (req, res, next) => {
  const response = s3Util.uploadFile(req.body.file.data, req.body.type, req.body.key);
  res.send(response);
})


//--------------get files' urls from folder---------------
app.get('/get-files-of-folder/:folder', (req, res, next) => {
  console.log('folder: ' + req.params.folder);
  const response = s3Util.getFilesFromFolder(req.params.folder, (data) => {
    console.log('urls: ' + JSON.stringify(data));
    res.send(data);
  });
});


// -- /donate/findDThrouhUser
app.get('/donate/findDThrouhUser/:user_mail', (req, res, next) => {
  try {
    console.log("in donate/findDThrouhUser/:user_mail")
    const qDUser = `select user_id from doners_in_org where user_id ="${req.params.user_mail}"`;
    console.log("query: \n" + qDUser + "\n");
    db.query(qDUser, (err, result, fields) => {
      if (err) throw err;
      if (result.length === 0)
        res.send("no data")
      else {
        console.log("res:  " + result[0].user_id);
        res.send(JSON.stringify(result[0]));
      }
    });
  }
  catch (err) {
    console.log("erroe " + err.code);
    res.end("err", err.code);
  }
});




//-----------------------send email---------------------
app.post('/sendEmail', (req, res) => {

  sendEmail(
    req.body.mail_to,
    req.body.cc,
    req.body.bcc,
    req.body.subject,
    req.body.body,
    req.body.attachments,

    (error, info) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send(info);
      }
    });

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ addOrg ~~~~~~~~~~~~~~~~~~~~

function checkAddOrgDetails(paramO) {
  // org_id, org_name ,one_time_donation , min_donation ,approved,org_num ,  branch ,account_num, bank_num, account_owner
  // , admin_name ,description ,field_of_activity, img_url ,founding_year, working ,volunteers, friends ,city_name,country_name ,building ,street, p_code
  var q = ` INSERT INTO organizations (`
  var insertinfValue = `)VALUES(`

  // neccesery 
  //TODO: account_owner - take from cognito?
  q += `org_id,org_name,min_donation,one_time_donation,approved,org_num,branch,account_num,bank_num,account_owner`;
  insertinfValue += `${paramO.org_id},${paramO.org_name},${paramO.min_donation},${paramO.one_time_donation},0,
    ${paramO.branch},${paramO.account_num},${paramO.bank_num},${paramO.account_owner},${paramO.org_num}`

  // --- check
  if (paramO.img_url != '') {
    q += `,img_url`;
    insertinfValue += `,${paramO.img_url}`;
  }
  if (paramO.founding_year != '') {
    q += `,founding_year`;
    insertinfValue += `,${paramO.founding_year}`;
  }
  if (paramO.working != '') {
    q += `,working`;
    insertinfValue += `,${paramO.working}`;
  }
  if (paramO.volunteers != '') {
    q += `,volunteers`;
    insertinfValue += `,${paramO.volunteers}`;
  }
  if (paramO.friends != '') {
    q += `,friends`;
    insertinfValue += `,${paramO.friends}`;
  }
  // if(paramO.admin_name!=''){
  //   q += `,admin_name`;
  //   insertinfValue += `,${paramO.admin_name}`;
  // }
  if (paramO.admin_name != '') {
    q += `,admin_name`;
    insertinfValue += `,${paramO.admin_name}`;
  }
  if (paramO.description != '') {
    q += `,description`;
    insertinfValue += `,"${paramO.description}"`;
  }
  // TODO!! field_of_activity
  // if(paramO.field_of_activity!=''){
  //   q += `,field_of_activity`;
  //   insertinfValue += `,"${paramO.field_of_activity}"`;

  // nessecery

  insertinfValue += `);`
  const query = q + insertinfValue;
  console.log("param (in fun) \n" + query);

  return query
}


// ~~~~~~~ addOrg ~~~~~~~
app.post('/addOrg', (req, res, next) => {

  console.log("the org:")
  // need to check user login ?
  try {
    console.log("in /addOrg \n ")

    const qAddOrg = checkAddOrgDetails(req.body);// check details
    console.log("quert is: \n", qAddOrg, "\n");

    db.query(qAddOrg, (err, result, fields) => {
      if (!err) {
        res.send("insert org");//response
        console.log("succses! ");
      }
      else {
        res.end("db fail");
        console.log("fail db " + err.code);
      }

      // console.log("result " + result);
    })
    // console.log("in check \n")
    // console.log("string obj \n "+ JSON.stringify(req.body));
  }
  catch (err) {
    console.log("error " + err.code);
    res.end("err server ", err.code)
  }


});

app.post('/addOrg/firstStep', (req, res, next) => {

  const qFirstAdd = `INSERT INTO Doners_in_org (org_id,org_name,min_donation,one_time_donation,approved)
    VALUES(${req.body.org_id},${req.body.org_name},${req.body.min_donation},${req.body.one_time_donation},0,
    );`
  // ,org_num,branch,account_num,bank_num,account_owner
  // ${paramO.branch},${paramO.account_num},${paramO.bank_num},${paramO.account_owner},${paramO.org_num}


});
//~~~~~~~~~~~~~~~~~~~~ donate process ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// check which details exsist and do a query
function checkDonateDetails(paramO) {
  // user_id, org_id, monthly_donation, referred_by,d_title, d_description,is_anonim,status_id
  var q = ` INSERT INTO Doners_in_org (`
  var insertinfValue = `)VALUES(`

  // neccesery
  // TODO: check if the neccesery value input? -> before?

  q += `user_id,org_id,monthly_donation`;
  insertinfValue += `"${paramO.user_id}",${paramO.org_id},${paramO.monthly_donation}`

  // --- check
  if (paramO.referred_by !== '') {
    q += `,referred_by`;
    insertinfValue += `,"${paramO.referred_by}"`;
  }
  if (paramO.d_title !== '') {
    q += `,d_title`;
    insertinfValue += `,"${paramO.d_title}"`;
  }
  if (paramO.d_description != '') {
    q += `,d_description`;
    insertinfValue += `,"${paramO.d_description}"`;
  }
  // nessecery

  q += `,anonymous,status_id`;
  insertinfValue += `,${paramO.anonymous},1);`

  const query = q + insertinfValue;
  console.log("param (in fun) \n" + query);

  return query
}

// ~~~~~~~~~~~~ post:  /donationProcess --> donate ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.post('/donationProcess', (req, res, next) => {
  try {
    console.log("in /donationProcess \n ")

    // let qDonate = ` INSERT INTO Doners_in_org SET ?', ${JSON.stringify(req.body)}`
    //  ${req.body.is_admin });`


    const qDonate = checkDonateDetails(req.body);// check details
    console.log("quert is: \n", qDonate, "\n");

    db.query(qDonate, (err, result, fields) => {
      if (!err) {
        res.send("insert donation");//response
        console.log("succses! ");
      }
      else {
        res.end("db fail");
        console.log("fail db " + err.code);
      }

      // console.log("result " + result);
    })
    // console.log("in check \n")
    // console.log("string obj \n "+ JSON.stringify(req.body));
  }
  catch (err) {
    console.log("erroer " + err.code);
    res.end("err server ", err.code)
  }
});

// ---- orgPage/gifts (get)
app.get('/orgPage/gifts/:org_id', (req, res, next) => {
  try {
    console.log(" in orgPage/gifts \n")
    console.log("org_id: \n "+ req.params.org_id)
    const qGifts =
      `
      SELECT 
      l.level_name as l_name, l.min_people, l.min_sum,
         g.gift_id, g.gift_name,
         g.gift_description,g.gift_pic,
         g.g_date, g.winer
       FROM
         Levels l
      INNER JOIN gifts g ON l.level_num = g.level_num and l.org_id ="${req.params.org_id}";`


    console.log("the query: \n" + qGifts)
    db.query(qGifts, (error, results, fields) => {

      if (error) throw error;
      console.log("res: \n" + JSON.stringify(results));
      console.log(results[0]);


      // console.log(JSON.stringify(results.data));
      // console.log(results.data[0].l_name)
      if (results.length == 0)
        res.send("no data")
      else
        res.send(results);

    });

  } catch (err) {
    console.log("error: " + err.code)
    res.send("server error: " + err.code)
  }
});


/*
SELECT 
  l.l_name, l.min_people, l.min_sum,
  g.gift_id, g.gift_name,
  g.gift_description,g.gift_pic,
  g.g_date, g.winer
FROM
    Leveled l
-- WHERE l.org_id = 1;
INNER JOIN gifts g 
  ON l.level_id = g.level_id and l.org_id = 1;
  */



// @ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//the function bellow checks if the user is the program Admin to enable special routing

//------------is org admin--------------
app.get('/EditOrgPage/:userId/is-org-admin/:orgId', function (req, res, next) {
  const sqlQuery = `SELECT org_admin_id FROM Organizations WHERE org_id='${req.params.orgId}' AND approved=1`;
  db.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.send(!!results && !!results.length);
  });
});

app.get('/:userId/is-program-admin', function (req, res, next) {
  res.send(req.params.userId === 'tehilaj97@gmail.com');
});




//-~~~~~~~~~~~~~~~~~~ code ~~~~~~~~~~~~~~~~~~

app.post('/add_user', function(req,res){
  console.log("start signup....");
  try {
    const response = userRestirationService.register(req.body.user, (err, result) => {
      if (err) {
        console.log('register error: ' + err);
        res.send(err);
      } else {
        res.send("registered");
      }
    });
  } catch (error) {
    console.log("error: "+JSON.stringify(error));  
    res.send('Unknown error registering user. Please try again later.');
  }});


// @ check server connection
// app.get('/checkServer',function(req,res){
//   console.log("checkServer !!! ....");
//   try {
//     res.send("yes");
//   } catch (error) {
//     console.log("error: "+JSON.stringify(error));  
//     res.send("no")
//   }

// });



//-----confirm registerd user ------
app.post('/confirm_registerd_user', function(req,res){
  console.log("start confirmation....");
  try {
    const response = userRestirationService.confirmRegistration(req.body.user_name, req.body.confirmation_code, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("confirmed");
      }
    });    
  } catch (error) {
    console.log("error: "+JSON.stringify(error));
    res.send('Unknown error confirming user. Please try again later.'); 
  }
});


//-------login --------
app.post('/login', (req, res) => {
  try {
    const response = userLoginService.authenticate(req.body.userName, req.body.pswd, (err, session) => {
      if (err) {
        console.log('login error: ' + err);
        res.send(err);
      } else {
        res.send("loggedIn");
      }
    });
    // console.log("in server log in success")

  } catch (error) {
    console.log("error: " + JSON.stringify(error));
    res.send('Unknown error logging in. Please try again later.');
  }
})

//------------logout----------
app.post('/logout', function (req, res) {
  userLoginService.logout();
  res.send("logged out");
});




//---------------get current user--------------
app.post('/get_current_user', function (req, res) {
  console.log("get current user: " + JSON.stringify(cognitoUtil.getCurrentUser()))
  res.send(cognitoUtil.getCurrentUser())
});


//---------------get user params--------------
app.post('/get_user_params', function (req, res) {
  console.log("start server get user params");
  let params = [];
  const err = userParametersService.getParameters(params);
  if (err) {
    res.send(err);
  }
  reactor.registerEvent('got_user_params');
  reactor.addEventListener('got_user_params', function () {
    res.send(params);
  });

});


// -- data 
app.get('/data', function (req, res, next) {
  db.query('select org_id,img_url,org_name,min_donation from Organizations WHERE approved=1', function (error, results, fields) {
    if (error) throw error;
    console.log("data org in body: \n " + results)
    res.send(JSON.stringify(results));
  });
});



//-------------------get org trees from cache for user------------------------
app.get('/userOrgTrees/:user_id', function (req, res, next) {
  const trees = statusCache.getOrgsForUser(req.params.user_id);
  console.log('my trees:\n' + JSON.stringify(trees));

  const orgIds = Object.keys(trees);
  let index = 0;

  //after recieving all the orgs from the cache - recieving their info from the db:
  orgIds.forEach(orgId => {
    const level = statusCache.getOrgLevel(orgId, trees[orgId].key.level);
    trees[orgId].level = level;
    db.query(`SELECT img_url, org_name from Organizations WHERE org_id=${orgId}`, function (error, results, fields) {
      if (error) throw error;

      trees[orgId].org_name = results[0].org_name;
      trees[orgId].img_url = results[0].img_url;

      //checking how many organzaionts info was returned. the request will return only once all organizations data was retrieved
      index++;

      if (index == orgIds.length) {
        res.send(trees);
      }
    });
  });
});



//----------fetch organization data from data base-----------
app.post('/fetch_org_data', (req, res) => {
  console.log("fetch_org_data");
  let query = `SELECT * FROM Organizations WHERE approved=1`
  db.query(query, (err, result, fields) => {
    if (!err) {
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

// function to add another comment to the feed
app.post('/add-comment', (req, res, next) => {

  const qFirstAdd = `INSERT INTO Feed_comments (feed_type, feed_type_id, user_id, date, comment_text, likes) VALUES
  (${req.body.feed_type},${req.body.feed_type_id}, ${req.body.user_id}, ${req.body.date}, ${req.body.comment_text}, ${req.body.likes});` 
  console.log('in add-comment in server. query: '+ qFirstAdd)
  res.send('done add-comment')
});

//------------- ??? -------
//---findDuser ---
app.post('/findDuser', (req, res) => {
  console.log(req.body.userD)
  let query = `SELECT * FROM Users WHERE user_name="${req.body.userD}"`
  console.log("req body", req.body)
  console.log(query)
  db.query(query, (err, result, fields) => {
    if (!err) {
      console.log("found user " + result[0].user_id)
      res.end((result[0].user_id).toString())

    }
    else
      res.end("fail")
    console.log(result)
  })
})

//------------org admin of------------------
app.get('/:userId/org-admin-of',
  function (req, res, next) {
    //const sqlQuery = `SELECT * FROM organizations WHERE org_admin_id = '${req.params.userId}'`;
    const sqlQuery = `SELECT * FROM organizations WHERE org_admin_id='${req.params.userId}' AND approved=1`;
    console.log(sqlQuery);

    db.query(sqlQuery, (err, result, fields) => {
      if (!err) {
        console.log('res: ' + JSON.stringify(result));
        res.send(!!result && !!result.length && result);
      } else {
        console.log('error: ' + JSON.stringify(err));
        res.send(null);
      }
      console.log(result);
    })
  });

//-------------------function that gets the comments of users for given feed_id------------------
app.post('/OrgPage/fetch-feed-comments/:feed_type/:feed_type_id',
// app.post('/fetch-feed-comments',
function (req, res, next) {
  console.log('in fetch feed comments');
    const sqlQuery = `SELECT * FROM Feed_comments WHERE feed_type="${req.params.feed_type}" and feed_type_id=${req.params.feed_type_id}`
    // const sqlQuery = `SELECT * FROM Feed_comments WHERE feed_type="org" and feed_type_id=2`
    console.log(sqlQuery)
    db.query(sqlQuery, (err, result, fields) => {
      if (!err) {
        console.log('res: ' + JSON.stringify(result));
        res.send(result);
      } else {
        console.log('error: ' + JSON.stringify(err));
        res.send(null);
      };
    })
  });

//-------------------get non approved orgs------------------
app.get('/non-approved-orgs',
  function (req, res, next) {
    const sqlQuery = `SELECT * FROM organizations WHERE approved=0`;

    db.query(sqlQuery, (err, result, fields) => {
      if (!err) {
        console.log('res: ' + JSON.stringify(result));
        res.send(result);
      } else {
        console.log('error: ' + JSON.stringify(err));
        res.send(null);
      };
    })
  });

  //---------------------approve orgs-------------------
app.post('/approve-orgs', (req, res) => {
  console.log(JSON.stringify(req.body.org_ids));
  let query = `UPDATE Organizations SET approved=1 WHERE org_id IN (${req.body.org_ids})`;
  console.log(query);
  db.query(query, (err, result, fields) => {
    if (!err) {
      res.send('success');
    }
    else {
      console.log('err:' + JSON.stringify(err));
      res.send("fail");
    }
    console.log(result)
  });
});


 //---------------------disapprove orgs-------------------
 app.post('/disapprove-orgs', (req, res) => {
  console.log(JSON.stringify(req.body.org_ids));
  let query = `DELETE FROM Organizations WHERE org_id IN (${req.body.org_ids})`;
  console.log(query);
  db.query(query, (err, result, fields) => {
    if (!err) {
      res.send('success');
    }
    else {
      console.log('err:' + JSON.stringify(err));
      res.send("fail");
    }
    console.log(result)
  });
});


//port for server
app.listen('5000', () => {
  console.log('app running on port 5000')
})
