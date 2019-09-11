
const { Client } = require('pg');
const connectionString = 'postgres://postgres:maryam1234@localhost:5433/tours';
const db = new Client({
        host: 'localhost',
        user: 'postgres',
        password: 'maryam1234',
        //change db to database
        database: 'postgres',
        port: 5433
});
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});

module.exports = db ;
