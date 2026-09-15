require("dotenv").config();
const { Pool }  = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

pool.connect(err => {
  if (err) {
    console.log(
        "port: " + process.env.DB_PORT + ", " + 
        "host: " + process.env.DB_HOST + ", " + 
        "user: " + process.env.DB_USER + ", " + 
        "password: " + process.env.DB_PASS + ", " + 
        "database: " + process.env.DB_NAME
    );
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to PostgreSQL database.");
});

module.exports = pool;

// module.exports = {
//   query: (text, params) => connection.query(text, params),
// };

// export default pool;