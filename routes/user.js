var express = require('express');
var users = express.Router();
const db = require('../app/config/db');
const jwt = require('jsonwebtoken');


//REGISTER

users.post('/register',function (req, res, next) {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.pass;
  console.log(email,password)
   let query= "INSERT INTO users(email, password) VALUES ($1,$2) RETURNING user_id  ";
    db.query(query ,[email,password], (err, result) => {
      console.log(result)
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
      else
      {
         const user_id = result[0];

        let token = jwt.sign({ email: email, userId: user_id }, 'secret', {
          expiresIn: '1h'
        })
        res.json({ token: token });
      }
    })


});

users.post('/login', function (req, res, next) {
  const email = req.body.email;
  const password = req.body.pass;

  db.query("SELECT user_id , email , password FROM users WHERE email = $1", [email], function (error, results, fields) {
    console.log(results.rows[0].user_id)
    if (error) throw error;

    if (results.length === 0) {
      return res.json({ error: "User doesnot exist!" })
    }
    else {
      if(password==results.rows[0].password){
                  console.log(results)
          let token = jwt.sign({ email: email, userId: results.rows[0].user_id }, 'secret', {
            expiresIn: '1h'
          })
          res.json({
            token: token,
            expireIn: 3600
          });
      }
      else
          return res.json({ error: "Password is incorrect!" });

    }
  })
});

users.get('/getdata', function (req, res, next) {

  const userid = req.query.id;

  db.query("SELECT * FROM users WHERE ID = ?", [userid], function (error, results, fields) {

    res.json({
      results
    });
  })

});

users.get('/getall', function (req, res, next) {

  db.query("SELECT * FROM users", function (error, results, fields) {

    res.json({
      results
    });
  })

});


    


module.exports = users;
