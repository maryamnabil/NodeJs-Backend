var express = require('express');
var tours = express.Router();
const db = require('../app/config/db');
const AuthCheck = require("../middleware/check-auth")

tours.get('/getall', (req , res , next) => {
    
    let query ="SELECT * FROM tours";

    db.query(query , function (error , results , fields) {
        if (error) throw error ;

        res.json(results);
    });
});

tours.get('/getmytours/:id', (req , res , next) => {
    console.log(req.params)
    const user_id=req.params.id
    let query ="SELECT * FROM tours WHERE user_id=$1";

    db.query(query ,[user_id],function (error , results , fields) {
        if (error) throw error ;

        res.json(results);
    });
});


tours.get('/getById/:id', (req, res, next) => {
    let tour_id = req.params.id;
    console.log(tour_id)
    let query = "SELECT * FROM tours WHERE tour_id = ($1)";
    db.query(query, [tour_id], (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        else{
            console.log(results.body)
        res.json(results);
    }
    });
});

tours.post('/addtour', (req, res, next) => {
    console.log(req)
  const name = req.body.name;
  const fees=req.body.fees
  const phone = req.body.phone;
  const city = req.body.city;
  const language = req.body.language;
  const user_id=req.body.user_id
  let query= "INSERT INTO tours(name, fees,phone,city,language,user_id) VALUES ($1,$2,$3,$4,$5,$6)";
    db.query(query,[name,fees,phone,city,language,user_id] ,(err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
        else {
            res.status(200).json({
                result
            })
        }
    });
});



tours.delete('/delete/:id', (req, res) => {
    const tour_id = req.params.id;
    
    // select the itemid of the trip before deleting it to be able to delete it from place table
    const query = "DELETE FROM tours WHERE tour_id = ($1)";
    db.query(query, [tour_id], function (error, results, fields) {
           if (error) {
            console.log(error)
            return res.status(500).send(error);
        }
        else {
            res.status(200).json({
                results
            })
        }
    });
  });


tours.put('/edit/:id', (req, res) => {
    const tour_id = req.params.id;
    const name=req.body.name;
    const phone=req.body.phone;
    const fees=req.body.fees;
    const city = req.body.city;
    const language = req.body.language;
    // const user_id=req.body.user_id
    let query = "UPDATE tours SET name =$1 ,phone=$2,fees=$3,city=$4,language=$5 WHERE tour_id=$6 ";
    db.query(query,[name,phone,fees,city,language,tour_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Edited");
    });


});
 

module.exports = tours;