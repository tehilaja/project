// //import { signInButton, registerButton } from '../project-master/src/Clients/cognito_client';
// const cognitoClient = require('./cognito_client');

// //  --- CHANGES
// // const cognitoClient = require('../project/cognito_client');

// // const cognitoServiceFile = require('./src/cognito/cognito.service');
// // const userRegistrationFile = require('./src/cognito/user-registration.service');
// // const userLoginFile = require('./src/cognito/user-login.service');


// // ~~~~~~~~~~~ cognito ~~~~~~~~~~~~
// const cognitoServiceFile = require('./cognito/cognito.service');
// const userRegistrationFile = require('./cognito/user-registration.service');
// const userLoginFile = require('./cognito/user-login.service');
// const userParametersFile = require('./cognito/user-parameters.service');
// const awsServiceFile = require('./cognito/aws.service');



// const cognitoUtil = cognitoServiceFile.data.cognitoUtil;
// const userRestirationService = userRegistrationFile.data.userRegistrationService;
// const userLoginService = userLoginFile.data.userLoginService;

// const userParametersService = userParametersFile.data.userParametersService;
// const awsUtil = awsServiceFile.data.awsUtil;
const s3Util = require('./utilities/s3-utilities.js').methods;
const reactor = require("./utilities/custom-event").data.reactor;
const statusCache = require('./utilities/status-cache');
const paymentsUtil = require('./utilities/payments');
const dbUtil = require('./utilities/db');
const inQutationMarks = require('./utilities/string').inQutationMarks;
const sqlDateString = require('./utilities/string').sqlDateString;

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
  multipleStatements: true, //allow putting multiple statements in one query
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
             gift.gift_pic && [{ path: gift.gift_pic, filename: gift.gift_pic.substr(gift.gift_pic.lastIndexOf('_') + 1) }]            );
        });
        
      })

      console.log('gift receivers: ' + JSON.stringify(giftReceivers));
    });
  });
});



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
app.get('/get_field_of_activity', (req, res, next) => {
  try {
    // TODO : try the db multi connection problem
    // conectDb();
    console.log("in //get_field_of_activity")
    const q_field_name = 
      `select field_name from fields_of_activity`
    console.log("query: \n" + q_field_name);
    db.query(q_field_name, (err, result, fields) => {
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
app.get('/org_field_of_activity', (req, res, next) => {
  try {
    // TODO : try the db multi connection problem
    // conectDb();
    console.log("in //org_field_of_activity")
    const q_field_name = 
      `select distinct f.field_name, o.org_id from fields_of_activity f
      inner join  org_field_of_activity o on o.field_id = f.field_id`
    console.log("query: \n" + q_field_name);
    db.query(q_field_name, (err, result, fields) => {
      if (err) throw err;
      if (result.length === 0)
        res.send("no data")
      else {
        console.log("res:\n " + JSON.stringify(result));
        res.send(result);
      }
    });
  }
  catch (err) {
    console.log("error " + err.code);
    res.end("err", err.code);
  }

});



app.get(`/orgPage/get_org_field_of_activity/:orgId`, (req, res, next) => {
  try {
    // TODO : try the db multi connection problem
    // conectDb();
    console.log("in /orgPage/get_org_field_of_activity/:orgId c\n")
    console.log("id: " + req.params.orgId)

    const q_org_field_name = 
      `select f.field_name
      from Org_field_of_activity o
        inner join Fields_of_activity f ON o.field_id = f.field_id
      where o.org_id =${(req.params.orgId)};`

    console.log("query: \n" + q_org_field_name);
    db.query(q_org_field_name, (err, result, fields) => {
      if (err) throw err;
      if (result.length == 0)
        res.send("no data") 
      else {
        console.log("res fields:\n " + JSON.stringify(result));
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

    const qO = `select * from Organizations WHERE org_id=${req.params.orgId}`;
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

//------getting the number of donors for a specific organization ----
app.get('/get-num-donors/:org_id', (req, res, next) => {
  const response = statusCache.getOrgTree(req.params.org_id).key.referred_donors;
  // console.log("get-num-donors:"+JSON.stringify(response))
  res.send({num_donors: response});
});

//-----------------get donors of org who donate monthly------------------------
app.post('/get-donors-of-org', (req, res, next) => {
  try {
    const sqlQuery = `SELECT user_id FROM donors_in_org WHERE org_id=${req.body.org_id};`;
    dbUtil.callDB(db, sqlQuery, (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        console.log('error getting donors in org: '+JSON.stringify(err));
        res.send(err.message);
      }
    })
  } catch(err) {
      console.log('error getting donors in org: '+JSON.stringify(err));
      res.send(err.message);
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
app.post('/donate/findDThrouhUser', (req, res) => {
  try {
    console.log("req: "+ req.body.userMail + " "+ req.body.org_id)
    // console.log("req: "+ req.params.userMail + " "+ req.params.org_id)
    console.log("in donate/findDThrouhUser/:user_mail")
    const qDUser = `select user_id from donors_in_org where user_id ="${req.body.userMail}" and org_id =${req.body.org_id}`;
    // select user_id from donors_in_org where user_id ="tehilaj97@gmail.com" and org_id = 1;
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


// ~~~~~~~ addOrg ~~~~~~~
app.post('/addOrg', (req, res, next) => {

  const numberOrNull = (num) => num || null;
  const org = req.body.org;

  const sqlOrgsTableQuery = `INSERT INTO organizations (org_name, description, img_url, website, min_donation, one_time_donation, field_of_activity, approved, org_admin_id, admin_name) VALUES (${inQutationMarks(org.org_name)}, ${inQutationMarks(org.description)}, ${inQutationMarks(org.img_url)}, ${inQutationMarks(org.website)}, ${numberOrNull(org.min_donation)}, ${numberOrNull(org.one_time_donation)}, ${inQutationMarks(org.field_of_activity)}, 0, ${inQutationMarks(org.org_admin_id)}, ${inQutationMarks(org.admin_name)})`;  const sqlAddressesTableQuery = `INSERT INTO addresses (org_id, country, state, city, street, building, apartment, suite, zip ) VALUES (LAST_INSERT_ID(), ${inQutationMarks(org.country)}, ${inQutationMarks(org.state)}, ${inQutationMarks(org.city)}, ${inQutationMarks(org.street)}, ${numberOrNull(org.building)}, ${numberOrNull(org.apartment)}, ${numberOrNull(org.suite)}, ${numberOrNull(org.zip)})`;
  
  const query = `${sqlOrgsTableQuery};${sqlAddressesTableQuery};`;
  
  dbUtil.callDB(db, query, (err, result) => {
    if (err) {
      console.log('error adding org: ' + JSON.stringify(err));
      console.log(query);
      res.send('fail');
    } else {
      res.send('success');
    }
  });
});

//---------------------- add donor in org - monthly donation -----------------------
app.post('/add-donor-in-org', (req, res, next) => {
  const dio = req.body.dio;
  const sqlQuery = `INSERT INTO Donors_in_org (org_id, user_id, referred_by, monthly_donation, d_date, d_title, d_description, status_id) VALUES(${dio.org_id},${inQutationMarks(dio.user_id)},${inQutationMarks(dio.referred_by)},${dio.monthly_donation},${inQutationMarks(sqlDateString())},${inQutationMarks(dio.d_title)},${inQutationMarks(dio.d_description)},1);`
    dbUtil.callDB(db, sqlQuery, (err, result) => {
    if (!err) {
      statusCache.addDonorToOrg(dio.user_id, dio.org_id, dio.monthly_donation, dio.referred_by);
      res.send('success');
    } else {
      console.log('error adding donor in org:\n'+console.log(err));
      console.log(sqlQuery);
      res.send('fail');
    }
  })
});


//-----------------------add one time donation to db-------------------------
app.post('/add-one-time-donation', (req, res, next) => {
  const donation = req.body.donation;
  const sqlQuery = `INSERT INTO one_time_donations(user_id,org_id,referred_by,sum_donation,anonymous, d_date) VALUES (${inQutationMarks(donation.user_id)},${donation.org_id},${inQutationMarks(donation.referred_by)},${donation.monthly_donation},0, ${inQutationMarks(sqlDateString())});`
  dbUtil.callDB(db, sqlQuery, (err, result) => {
    if (!err) {
      res.send('success');
    } else {
      console.log('error adding one time donation:\n' + JSON.stringify(err));
      console.log(sqlQuery)
    }
  });
});

//-------------------function that gets the gifts for organization ------------------
app.get('/orgPage/gifts/:org_id',
function (req, res, next) {

   const qGifts =	
       
   `SELECT 	
   l.level_name as l_name, l.min_people, l.min_sum,	     
   g.gift_id, g.gift_name,	     
   g.gift_description,g.gift_pic,	       
   g.g_date, g.winner, o.org_name
  from gifts g
  INNER JOIN levels l ON l.level_num = g.level_num and l.org_id = g.org_id
  inner join organizations o on o.org_id = g.org_id and o.org_id =${req.params.org_id} and g.winner is null
   group by g.gift_name;`
  
  console.log('in org page gifts \n');
    // const sqlQuery = `select * from Gifts WHERE org_id=${req.params.org_id} and winner IS NULL`
    console.log(qGifts)
    db.query(qGifts, (err, result, fields) => {
      if (!err) {
        console.log('res:\n ' + JSON.stringify(result));
        res.send(result);
      } else {
        console.log('error: ' + JSON.stringify(err));
        res.send(null);
      };
    })
  });

  app.get('/orgPage/getLevels/:org_id',
  function (req, res, next) {
    console.log('in get level \n');
      const sqlQuery = `select * from levels WHERE org_id=${req.params.org_id}`
      console.log(sqlQuery)
      db.query(sqlQuery, (err, result, fields) => {
        if (!err) {
          console.log('res level: \n ' + JSON.stringify(result));
          res.send(result);
        } else {
          console.log('error: ' + JSON.stringify(err));
          res.send(null);
        };
      })
    });
    // ------------------
  app.get('/getLevels',function (req, res, next) {
    console.log('in get level \n');
      const sqlQuery = `select distinct level_name from levels`
      console.log(sqlQuery)
      db.query(sqlQuery, (err, result, fields) => {
        if (!err) {
          console.log('res level: \n ' + JSON.stringify(result));
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
  const sqlQuery = `SELECT org_admin_id FROM Organizations WHERE org_id=${inQutationMarks(req.params.orgId)} AND approved=1`;
  db.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    res.send(!!results && !!results.length);
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
    const sqlQuery = `SELECT * FROM Feed_comments WHERE feed_type=${inQutationMarks(req.params.feed_type)} and feed_type_id=${req.params.feed_type_id}`
    // const sqlQuery = `SELECT * FROM Feed_comments WHERE feed_type="org" and feed_type_id=2`
    // console.log(sqlQuery)
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
  (${inQutationMarks(req.body.feed_type)},${req.body.feed_type_id}, ${inQutationMarks(req.body.user_id)}, ${inQutationMarks(req.body.date)}, ${inQutationMarks(req.body.comment_text)}, ${req.body.likes});` 
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
  let query = `SELECT * FROM Users WHERE user_name=${inQutationMarks(req.body.userD)}`
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
    //const sqlQuery = `SELECT * FROM organizations WHERE org_admin_id = ${inQutationMarks(req.params.userId}'`;
    const sqlQuery = `SELECT * FROM organizations WHERE org_admin_id=${inQutationMarks(req.params.userId)} AND approved=1`;
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
      req.body.org_ids.forEach(org_id => statusCache.addOrg(org_id));
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
  const condition = `WHERE org_id=${req.body.org_id} AND d_date < ${inQutationMarks(beginningOfCurrent)}`;
  const sqlDioTable = `SELECT user_id, referred_by, monthly_donation as sum_donation, d_date, d_title, d_description, "Monthly" as monthly_oneTime FROM donors_in_org ${condition} AND status_id=1`;
  const sqlOneTimeTable = `SELECT user_id, referred_by, sum_donation, d_date, '' as d_title, '' as d_description, "One Time" as monthly_oneTime FROM one_time_donations ${condition} AND d_date >= ${inQutationMarks(beginningOfPrev)}`;
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
  const org_ids = req.body.org_ids;
  console.log(JSON.stringify(req.body.org_ids));
  const condition = `WHERE org_id IN (${org_ids})`;
  let query = `DELETE FROM Organizations ${condition}; DELETE FROM addresses ${condition}; DELETE FROM bank_info ${condition};`;  console.log(query);
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
        result[0].org_id = req.body.org_id;
        result[0].levels = statusCache.getOrgLevels(req.body.org_id) || [{level_num: 4, min_people: null, min_sum: null},{level_num: 3, min_people: null, min_sum: null},{level_num: 2, min_people: null, min_sum: null},{level_num: 1, min_people: null, min_sum: null}];
        res.send(result[0]);
      }
    });
});

//---------------update org data----------------
app.post('/update-org-data', (req, res) => {
  const org = req.body.org;
  const condition = `WHERE org_id=${org.org_id}`;
  const sqlOrgsTableQuery = `UPDATE organizations SET org_name=${inQutationMarks(org.org_name)}, description=${inQutationMarks(org.description)}, img_url=${inQutationMarks(org.img_url)}, website=${inQutationMarks(org.website)}, min_donation=${org.min_donation}, one_time_donation=${org.one_time_donation}, field_of_activity=${inQutationMarks(org.field_of_activity)} ${condition}`;  const sqlBankInfoTableQuery = `DELETE FROM bank_info ${condition};INSERT INTO bank_info (org_id, bank_num, branch, account_num, account_owner) VALUES (${org.org_id}, ${org.bank_num}, ${org.branch}, ${org.account_num}, ${inQutationMarks(org.account_owner)})`;
  const sqlAddressesTableQuery = `DELETE FROM addresses ${condition};INSERT INTO addresses (org_id, country, state, city, street, building, apartment, suite, zip ) VALUES (${org.org_id}, ${inQutationMarks(org.country)}, ${inQutationMarks(org.state)}, ${inQutationMarks(org.city)}, ${inQutationMarks(org.street)}, ${org.building}, ${org.apartment}, ${org.suite}, ${org.zip})`;
  const sqlLevelsTableQueries = org.levels && org.levels.reduce((acc, level) => `${acc}DELETE FROM levels ${condition} AND level_num=${level.level_num}; INSERT INTO levels (org_id, level_num, level_name, min_people, min_sum) VALUES (${org.org_id}, ${level.level_num}, ${inQutationMarks(level.level_name)}, ${level.min_people}, ${level.min_sum});`, '');
  
  const query = `${sqlBankInfoTableQuery};${sqlOrgsTableQuery};${sqlAddressesTableQuery};${sqlLevelsTableQueries}`;
  
  dbUtil.callDB(db, query, (err, result) => {
    if (err) {
      console.log('error updating org data: ' + JSON.stringify(err));
      console.log(query);
      res.send('fail');
    } else {
      if (org.levels) {
        statusCache.updateLevelsInOrg(org.org_id, org.levels);
      }
      res.send('success');
    }
  });
});

app.get('/get_gift_and_levels',(req,res)=>{
  const qGift = 
  ` SELECT 	
  l.level_name as l_name, l.min_people, l.min_sum,	     
  g.gift_id, g.gift_name,	     
  g.gift_description,g.gift_pic,	       
  g.g_date, g.winner, o.org_name
 from gifts g
 INNER JOIN levels l ON l.level_num = g.level_num and g.org_id = l.org_id
 inner join organizations o on o.org_id = g.org_id
  group by g.gift_name;`
    dbUtil.callDB(db, qGift, (err, result) => {
      if (err) {
        console.log('error updating org data: ' + JSON.stringify(err));
        console.log(qGift);
        res.send('fail');
      } else {
        res.send(result);
      }
    });
});

// ------------------
app.get('/list_of_org',(req,res)=>{
  const qorg = 'select org_id,org_name,img_url from organizations'
  dbUtil.callDB(db, qorg, (err, result) => {
    if (err) {
      console.log('error updating org data: ' + JSON.stringify(err));
      console.log(qorg);
      res.send('fail');
    } else {
      console.log("org \n"+ JSON.stringify(res.data))
      res.send(result);
    }
  });
});

//------------------add prize------------------
app.post('/add-prize', (req, res) => {
  const gift = req.body.gift;
  const sqlQuery = `INSERT INTO gifts (gift_name, gift_description, gift_pic, org_id, level_num, g_date, raffle) VALUES (${inQutationMarks(gift.gift_name)}, ${inQutationMarks(gift.gift_description)}, ${inQutationMarks(gift.gift_pic)}, ${gift.org_id}, ${gift.level_num}, ${inQutationMarks(gift.g_date)}, ${gift.raffle})`;
  dbUtil.callDB(db, sqlQuery, (err, result) => {
    if (!err) {
      res.send('success');
    } else {
      console.log('\n\nerror adding prize:'+JSON.stringify(err));
      res.send('fail');
    }
  });
})


//port for server
app.listen('5000', () => {
  console.log('app running on port 5000')
})