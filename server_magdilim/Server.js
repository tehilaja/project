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
const paymentsUtil = require('./utilities/payments');
const dbUtil = require('./utilities/db');


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express');
const app = express(); //library to shorten http requests

const mysql = require('mysql');
const bodyParser = require('body-parser');

const sendEmail = require('./utilities/email').methods.sendEmail;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
var my_user = null
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
  // statusCache.addDonorToOrg('anotherid@id.com', 1, 3000, 'someid@id.com');
  // console.log(`\n\n\norg 1 after adding:\n`+JSON.stringify(statusCache.getOrgTree(1)));
  // statusCache.updateDonorInOrg('someotherid@id.com', 1, 80, 500);
  // console.log(`\n\n\norg 1 after updating:\n`+JSON.stringify(statusCache.getOrgTree(1)));
  // statusCache.updateLevelInOrg(1, {"org_id":1,"level_num":4,"level_name":"כסף","min_sum":3000});
  // console.log(`\n\n\norg 1 after updating level:\n`+JSON.stringify(statusCache.getOrgTree(1)));
  // statusCache.getGiftsReceivers(db, (giftReceivers) => {
  //   console.log('gift receivers: '+JSON.stringify(giftReceivers));
  //   });

});


// ~~~~~~~~~~~~~~~~~~~ scheduled jobs ~~~~~~~~~~~~~~~~~
const schedule = require('node-schedule');
const { json } = require('body-parser');
const { Snowball } = require('aws-sdk');

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
            [{ path: gift.gift_pic, filename: gift.gift_pic.substr(gift.gift_pic.lastIndexOf('_') + 1) }]
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





// TODO: make in prochedure?
app.get('/lastDonation', (req, res, next) => {
  try {
    // const qLDonation = `SELECT d.user_id, d.org_id, u.user_name ,d.d_title,d.d_description, d.is_anonim,d.referred_by, d.d_date, o.img_url FROM Donors_in_org d 
    //   INNER JOIN users u ON u.user_id = d.user_id 
    //   INNER JOIN organizations o ON o.org_id = d.org_id
    //   ORDER BY d_date DESC LIMIT 20`;
    const qLDonation = `SELECT d.user_id, d.org_id, d.d_title,d.d_description, d.anonymous,d.referred_by, d.d_date, o.img_url,o.org_name FROM Donors_in_org d 
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
    console.log("error " + err.code);
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
        res.send(result[0]);
      }
    });
  }
  catch (err) {
    console.log("error " + err.code);
    res.end("err", err.code);
  }
});

//------getting the number of doners for a specific organization ----
app.get('/get-num-doners/:org_id', (req, res, next) => {
  console.log('get-num-doners: ' + req.params.org_id);
  const response = s3Util.getOrgTree(req.params.org_id).key.referred_doners;
  res.send(response);
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
    const qDUser = `select user_id from donors_in_org where user_id ="${req.params.user_mail}"`;
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

  const qFirstAdd = `INSERT INTO Donors_in_org (org_id,org_name,min_donation,one_time_donation,approved)
    VALUES(${req.body.org_id},${req.body.org_name},${req.body.min_donation},${req.body.one_time_donation},0,
    );`
  // ,org_num,branch,account_num,bank_num,account_owner
  // ${paramO.branch},${paramO.account_num},${paramO.bank_num},${paramO.account_owner},${paramO.org_num}


});
//~~~~~~~~~~~~~~~~~~~~ donate process ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// check which details exsist and do a query
function checkDonateDetails(paramO,if_oneTime) {
  // user_id, org_id, monthly_donation, referred_by,d_title, d_description,is_anonim,status_id
  var q = ` INSERT INTO Donors_in_org (`
  var insertinfValue = `)VALUES(`

  // neccesery
  // TODO: check if the neccesery value input? -> before?

  q += `user_id,org_id,monthly_donation`;
  insertinfValue += `"${paramO.user_id}",${paramO.org_id},${paramO.monthly_donation}`

  // --- check
  if(!if_oneTime)
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
// ~~~~~~~~~~~~ post:  /oneTimedonationProcess --> one time donate ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.post('/oneTimedonationProcess', (req, res, next) => {
  try {
    console.log("in /oneTimedonationProcess \n ")
    // const q1Donate = checkDonateDetails(req.body,true);// check details
    const q1Donate = `insert into one_time_donations(user_id,org_id,sum_donation,anonymous) value(,"${req.body.user_id}",${req.body.org_id},${req.body.monthly_donation},0);`
    console.log("quert is: \n", q1Donate, "\n");

    db.query(q1Donate, (err, result, fields) => {
      if (!err) {
        res.send("insert donation");
        console.log("succses! ");
      }
      else {
        res.end("db fail");
        console.log("fail db " + err.code);
      }
    })
  }
  catch (err) {
    console.log("error " + err.code);
    res.end("err server ", err.code)
  }
});


// ~~~~~~~~~~~~ post:  /donationProcess --> donate ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.post('/donationProcess', (req, res, next) => {
  try {
    let qDonate;
    console.log("in /donationProcess \n ")
    if (req.body.onTimeCheck == true) // one time donaition
      qDonate = `insert into one_time_donations(user_id,org_id,sum_donation,anonymous) value("${req.body.user_id}",${req.body.org_id},${req.body.monthly_donation},0);`

    else
      qDonate = checkDonateDetails(req.body,false);// check details
    console.log("quert is: \n", qDonate, "\n");

    db.query(qDonate, (err, result, fields) => {
      if (!err) {
        res.send("insert donation");
        console.log("succses! ");
      }
      else {
        res.end("db fail");
        console.log("fail db " + err.code);
      }
    })
  }
  catch (err) {
    console.log("error " + err.code);
    res.end("err server ", err.code)
  }
});

//-------------------function that gets the gifts for organization ------------------
app.post('/orgPage/gifts/:org_id',
function (req, res, next) {
  console.log('in org page gifts');
    const sqlQuery = `select * from Gifts WHERE org_id=${req.params.org_id} and winner IS NULL`
    console.log(sqlQuery)
    db.query(sqlQuery, (err, result, fields) => {
      if (!err) {
        // console.log('res: ' + JSON.stringify(result));
        res.send(result);
      } else {
        console.log('error: ' + JSON.stringify(err));
        res.send(null);
      };
    })
  });

// // ---- Gets the future gifts for specific organization page
// app.get('/orgPage/gifts/:org_id', function (req, res, next) {
//   q = `select * from Gifts WHERE org_id=${req.params.org_id} and winner IS NULL`;
//     db.query(q, function (error, results, fields) {
//       if (error) throw error;
//           console.log("orgPage/gifts/:org_id \n " + JSON.stringify(results))
//           res.send(JSON.stringify(results));
//         });
//  });


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

app.get('/EditOrgPage/:userId/is-program-admin', function (req, res, next) {
  res.send(req.params.userId === 'tehilaj97@gmail.com');
});

//for admin page
app.get('/:userId/is-program-admin', function (req, res, next) {
  res.send(req.params.userId === 'tehilaj97@gmail.com');
});



//-~~~~~~~~~~~~~~~~~~ code ~~~~~~~~~~~~~~~~~~

app.post('/add_user', function (req, res) {
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
    console.log("error: " + JSON.stringify(error));
    res.send('Unknown error registering user. Please try again later.');
  }
});


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
app.post('/confirm_registerd_user', function (req, res) {
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
    console.log("error: " + JSON.stringify(error));
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


// -- fetching organizations from DB:
app.get('/data', function (req, res, next) {
  db.query('select * from Organizations WHERE approved=1', function (error, results, fields) {
    if (error) throw error;
    console.log("data org in body: \n " + JSON.stringify(results))
    res.send(JSON.stringify(results));
  });
});

// -- fetching winners from DB:
app.get('/get-winners', function (req, res, next) {
  db.query('select * from Gifts WHERE winner IS NOT NULL', function (error, results, fields) {
    if (error) throw error;
    console.log("get-winners: \n " + JSON.stringify(results))
    res.send(JSON.stringify(results));
  });
});



//-------------------get org trees from cache for user------------------------
app.get('/userOrgTrees/:user_id', function (req, res, next) {
  const trees = statusCache.getOrgsForUser(req.params.user_id);
  //console.log('my trees:\n' + JSON.stringify(trees));

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

//FUNCTIONS FOR DEALING WITH FEED:

//-------------------function that gets the comments of users for given feed_id------------------
app.post('/OrgPage/fetch-feed-comments/:feed_type/:feed_type_id',
// app.post('/fetch-feed-comments',
function (req, res, next) {
  console.log('in fetch feed comments: '+JSON.stringify(req.params));
    const sqlQuery = `SELECT * FROM Feed_comments WHERE feed_type="${req.params.feed_type}" and feed_type_id=${req.params.feed_type_id}`
    // const sqlQuery = `SELECT * FROM Feed_comments WHERE feed_type="org" and feed_type_id=2`
    console.log(sqlQuery)
    db.query(sqlQuery, (err, result, fields) => {
      if (!err) {
        // console.log('res: ' + JSON.stringify(result));
        res.send(result);
      } else {
        console.log('error: ' + JSON.stringify(err));
        res.send(null);
      };
    })
  });

// function to add another comment to the feed
app.post('/add-comment', (req, res, next) => {

  const qAddComment = `INSERT INTO Feed_comments (feed_type, feed_type_id, user_id, date, comment_text, likes) VALUES
  ("${req.body.feed_type}",${req.body.feed_type_id}, "${req.body.user_id}", "${req.body.date}", "${req.body.comment_text}", ${req.body.likes});` 
  console.log('in add-comment in server. query: '+ qAddComment)
try{
  db.query(qAddComment, (err, result, fields) => {
    if (!err) {
      res.send('done add-comment');//response
      console.log("succses in done add-comment! ");
    }
    else {
      res.end('failed to add-comment');
      console.log('failed to add-comment ' + err.code);
    }

  })
 
}
catch (err) {
  console.log("error in add-comment" + err.code);
  res.end("err server ", err.code)
}

});

  //---------------------add likes-------------------
  app.post('/add-like', (req, res) => {
    console.log(JSON.stringify(req.body.comment_id));
    let query = `UPDATE Feed_comments SET likes = likes + 1 WHERE comment_id=${req.body.comment_id}`;
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

//---------------------get orgs to pay------------------
app.get('/get-orgs-to-pay',
  function (req, res, next) {
    paymentsUtil.getOrgsToPay(db, (err, result) => {
      if (err) {
        console.log('error getting orgs to pay: ' + JSON.stringify(err));
        res.send(null);
      } else {
        let index = 0;
        Object.keys(result).forEach(org_id => {
          const sqlQuery = `SELECT o.org_id, o.org_name, o.org_admin_id, o.admin_name, o.img_url, b.branch, b.account_num, b.bank_num, b.account_owner from Organizations o Inner Join bank_info b WHERE o.org_id=${org_id} AND b.org_id=${org_id}`;
          db.query(sqlQuery, (error, results, fields) => {
            if (!error) {
              index++;
              Object.assign(result[org_id], results[0]);

              if (index === Object.keys(result).length) {
                res.send(result);
              }
            } else {
              console.log('error getting org info:\n' + JSON.stringify(error));
              res.end(result);
            }
          })
        })
      }
    })
  });


//--------------------pay orgs------------------
app.post('/pay-orgs', (req, res) => {
  paymentsUtil.payOrgs(db, req.body.orgs, (err, result) => {
    if (!err) {
      res.send('success');
    } else {
      console.log('error paying orgs: '+JSON.stringify(err));
      res.end();
    }
  })  
});


//-------------------org donations to display---------------
app.post('/get-org-donations-to-display', (req, res) => {
  const [beginningOfCurrent, beginningOfPrev] = paymentsUtil.beginningOfCurrAndPrevMonth();
  const condition = `WHERE org_id=${req.body.org_id} AND d_date < "${beginningOfCurrent}"`;
  const sqlDioTable = `SELECT user_id, referred_by, monthly_donation as sum_donation, d_date, d_title, d_description, "Monthly" as monthly_oneTime FROM donors_in_org ${condition} AND status_id=1`;
  const sqlOneTimeTable = `SELECT user_id, referred_by, sum_donation, d_date, '' as d_title, '' as d_description, "One Time" as monthly_oneTime FROM one_time_donations ${condition} AND d_date >= "${beginningOfPrev}"`;
  const sqlQuery = `${sqlDioTable} UNION  ${sqlOneTimeTable}`;
  console.log(sqlQuery);

  dbUtil.callDB(db, sqlQuery, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log('error getting donations to display:\n'+JSON.stringify(err));
      res.send(false);
    }
  })
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

// function for updating org information:

//-----------------get all org data--------------
app.post('/get-all-org-data', (req, res) => {
  const sqlQuery = `SELECT * FROM Organizations LEFT JOIN bank_info ON organizations.org_id = bank_info.org_id LEFT join addresses ON organizations.org_id = addresses.org_id WHERE organizations.org_id=${req.body.org_id};`;
    dbUtil.callDB(db, sqlQuery, (err, result) => {
      if (err) {
        console.log('error getting all data: '+JSON.stringify(err))
        res.send('error')
      } else {
        result[0].levels = statusCache.getOrgLevels(req.body.org_id);
        res.send(result[0]);
      }
    });
});

//---------------update org data----------------
app.post('/update-org-data', (req, res) => {
  const org = req.body.org;
  const condition = `WHERE org_id=${org.org_id}`;
  const sqlOrgsTableQuery = `UPDATE organizations SET org_name='${org.org_name}', description='${org.description}', img_url='${org.img_url}', min_donation=${org.min_donation}, one_time_donation=${org.one_time_donation}, field_of_acctivity='${org.field_of_acctivity}' ${condition}`;
  const sqlBankInfoTableQuery = `UPDATE bank_info SET bank_num=${org.bank_num}, branch=${org.branch}, account_num=${org.account_num}, account_owner='${org.account_owner}' ${condition}`;
  const sqlAddressesTableQuery = `UPDATE addresses SET country='${org.country}', state='${org.state}', city='${org.city}', street='${org.street}', building=${org.building}, apartment=${org.apartment}, suite=${org.suite}, zip=${org.zip} ${condition}`;
  const sqlLevelsTableQueries = org.levels && org.levels.reduce((acc, level) => `${acc}UPDATE levels SET level_name='${level.level_name}', min_people=${level.min_people}, min_sum=${level.min_sum} ${condition} AND level_num=${level.level_num};`, '');

  dbUtil.callDB(db, `${sqlOrgsTableQuery};${sqlBankInfoTableQuery};${sqlAddressesTableQuery};${sqlLevelsTableQueries}`, (err, result) => {
    if (err) {
      console.log('error updating org data: '+JSON.stringify(err));
      res.send('fail');
    } else {
      if (org.levels) {
        statusCache.updateLevelsInOrg(org.org_id, org.levels);
      }
      res.send('success');
    }
  });
});


//port for server
app.listen('5000', () => {
  console.log('app running on port 5000')
})
