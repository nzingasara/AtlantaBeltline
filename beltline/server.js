var express = require('express');
var app = express();

var path = require('path');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var mysql = require('mysql');


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',

  database : 'beltline',
  user     : process.env.user,
  password : process.env.password

});

connection.connect();




app.get('/takeTransit', (req, res) => {
  let response = res;
  connection.query('SELECT \n' +
    '    take.username, DATE(take.date) as date, site_name, connect.route, transit.type, transit.price\n' +
    'FROM\n' +
    '    connect,\n' +
    '    transit, take\n' +
    'WHERE\n' +
    '    connect.route = transit.route AND username="manager3";', (err, res, fields) => {
    console.log(res);
    response.send(res)
  })
});


// connection.query(`USE beltline`
// , function (error, results, fields) {
//   if (error) throw error;
// });


var bodyParser = require('body-parser')

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

app.post('/registerEmployee', function (req, res) {
  console.warn(req.body)
  const password = req.body.password
  const emails = req.body.emails

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      console.warn('hash: ', hash)
      connection.query(`INSERT INTO user (username, password, firstname, lastname) VALUES ('${req.body.username}', '${hash}', '${req.body.firstname}', '${req.body.lastname}');`
      , function (error, results, fields) {
        if (error) throw error;
        connection.query(`INSERT INTO employee (username, phone, address, city, state, zipcode, isVisitor) VALUES ('${req.body.username}', '${req.body.phone}', '${req.body.address}', '${req.body.city}', '${req.body.state}', '${req.body.zipcode}', FALSE);`
          , function (error, results, fields) {
            if (error) throw error;
            if (req.body.usertype == 'Staff') {
              connection.query(`INSERT INTO staff (username) VALUES ('${req.body.username}')`
              , function (error, results, fields) {
                if (error) throw error;
                console.warn('staff inserted')
                emails.map(email => {
                  connection.query(`INSERT INTO email (username, email) VALUES ('${req.body.username}', '${email.email}');`
                  , function (error, results, fields) {
                    if (error) throw error;
                  });
                })
              });
            } else if (req.body.usertype == 'Manager') {
              connection.query(`INSERT INTO manager (username) VALUES ('${req.body.username}')`
              , function (error, results, fields) {
                if (error) throw error;
                console.warn('manager inserted')
                emails.map(email => {
                  connection.query(`INSERT INTO email (username, email) VALUES ('${req.body.username}', '${email.email}');`
                  , function (error, results, fields) {
                    if (error) throw error;
                  });
                })
              });
            }
        })
        }
      );
        // Store hash in your password DB.
    });
});

})

app.post('/registerEmployeeVisitor', function (req, res) {
  console.warn(req.body)
  const password = req.body.password
  const emails = req.body.emails

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      console.warn('hash: ', hash)
      connection.query(`INSERT INTO user (username, password, firstname, lastname) VALUES ('${req.body.username}', '${hash}', '${req.body.firstname}', '${req.body.lastname}');`
      , function (error, results, fields) {
        if (error) throw error;
        connection.query(`INSERT INTO employee (username, phone, address, city, state, zipcode, isVisitor) VALUES ('${req.body.username}', '${req.body.phone}', '${req.body.address}', '${req.body.city}', '${req.body.state}', '${req.body.zipcode}', TRUE);`
          , function (error, results, fields) {
            if (error) throw error;
            if (req.body.usertype == 'Staff') {
              connection.query(`INSERT INTO staff (username) VALUES ('${req.body.username}')`
              , function (error, results, fields) {
                if (error) throw error;
                console.warn('staff inserted')
                emails.map(email => {
                  connection.query(`INSERT INTO email (username, email) VALUES ('${req.body.username}', '${email.email}');`
                  , function (error, results, fields) {
                    if (error) throw error;
                  });
                })
              });
            } else if (req.body.usertype == 'Manager') {
              connection.query(`INSERT INTO manager (username) VALUES ('${req.body.username}')`
              , function (error, results, fields) {
                if (error) throw error;
                console.warn('manager inserted')
                emails.map(email => {
                  connection.query(`INSERT INTO email (username, email) VALUES ('${req.body.username}', '${email.email}');`
                  , function (error, results, fields) {
                    if (error) throw error;
                  });
                })
              });
            }
        })
        }
      );
        // Store hash in your password DB.
    });
});

})

app.post('/registerVisitor', function (req, res) {
  console.warn(req.body)
  const password = req.body.password
  const emails = req.body.emails

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      console.warn('hash: ', hash)
      connection.query(`INSERT INTO user (username, password, firstname, lastname) VALUES ('${req.body.username}', '${hash}', '${req.body.firstname}', '${req.body.lastname}');`
      , function (error, results, fields) {
        if (error) throw error;
        connection.query(`INSERT INTO visitor (username) VALUES ('${req.body.username}');`
          , function (error, results, fields) {
            if (error) throw error;
            emails.map(email => {
              connection.query(`INSERT INTO email (username, email) VALUES ('${req.body.username}', '${email.email}');`
              , function (error, results, fields) {
                if (error) throw error;
              });
            })
          });
        }
      );
        // Store hash in your password DB.
    });
});

})



app.post('/registerUser', function (req, res) {
  console.warn(req.body)
  const password = req.body.password
  const emails = req.body.emails

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      console.warn('hash: ', hash)
      connection.query(`INSERT INTO user (username, password, firstname, lastname) VALUES ('${req.body.username}', '${hash}', '${req.body.firstname}', '${req.body.lastname}');`
      , function (error, results, fields) {
        if (error) throw error;
        emails.map(email => {
          connection.query(`INSERT INTO email (username, email) VALUES ('${req.body.username}', '${email.email}');`
          , function (error, results, fields) {
            if (error) throw error;
          });
        })
        }
      );
        // Store hash in your password DB.
    });
});

})


function loginUser(email, password, callback) {
  let userType;
  let isVisitor;
  connection.query(`SELECT * FROM email WHERE email='${email}'`
  , function (error, results, fields) {
    if (error) throw error;
    if (!results[0]) {
      callback(false)
    }
    const username = results[0].username
    console.warn(username)
    connection.query(`SELECT * FROM user WHERE username='${username}'`
    , function (error, results, fields) {
      if (error) throw error;
      console.warn('result of final query: ', results[0])
      const hash = results[0].password
      if (!results[0]) {
        return;
      }
      connection.query(`SELECT * FROM employee WHERE username='${username}'`
        , function (error, results, fields) {
          if (error) throw error;
          if (!results[0]) {
            connection.query(`SELECT * FROM visitor WHERE username='${username}'`
              , function (error, results, fields) {
                if (error) throw error;
                userType = 'Visitor'
                isVisitor = true
                bcrypt.compare(password, hash, function(err, result) {
                  callback(result, userType, isVisitor)
                });
              });
          } else {
            console.warn('isvisitor?: ', results[0].isVisitor)
            isVisitor = results[0].isVisitor
            connection.query(`SELECT * FROM administrator WHERE username='${username}'`
              , function (error, results, fields) {
                if (error) throw error;
                if (!results[0]) {
                  connection.query(`SELECT * FROM manager WHERE username='${username}'`
                  , function (error, results, fields) {
                    if (error) throw error;
                    if (!results[0]) {
                      connection.query(`SELECT * FROM staff WHERE username='${username}'`
                        , function (error, results, fields) {
                          if (error) throw error;
                          if (!results[0]) {
                            userType = 'User'
                            bcrypt.compare(password, hash, function(err, result) {
                              callback(result, userType, isVisitor)
                            });
                          } else {
                            userType = 'Staff'
                            bcrypt.compare(password, hash, function(err, result) {
                              callback(result, userType, isVisitor)
                            });
                          }
                        });
                    } else {
                      userType = 'Manager'
                      bcrypt.compare(password, hash, function(err, result) {
                        callback(result, userType, isVisitor)
                      });
                    }
                  });
                } else {
                  userType = 'Admin'
                  console.warn('password: ', password)
                  if(password === hash) {
                    callback(true, userType, isVisitor)
                  } else {
                    callback(false, userType, isVisitor)
                  }
                }
              });
            }
        });
    });
  });
}
app.post('/login', function (req, res) {
  const password = req.body.password
  const email = req.body.email

  loginUser(email, password, function(isLoggedIn, userType, isVisitor) {
    console.warn('userType: ', userType)
    console.warn('isVisitory: ', isVisitor)
    res.status(201).json({isLoggedIn, userType, isVisitor})
    return;
  })

})

//connection.end();
