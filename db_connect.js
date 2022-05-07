const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "lecturer_schedule_app",
  password: "admin",
  port: 5432,
});



console.log("The pool is open");
module.exports = pool;
