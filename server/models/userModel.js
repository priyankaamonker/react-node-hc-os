const db = require("../config/db");
const format = require('pg-format');

// Get all users
exports.getAllUsers = callback => {
  db.query("SELECT * FROM users", callback);
};

// Get user by ID
exports.getUserById = (id, callback) => {
  db.query("SELECT * FROM users WHERE id = $1", [id], callback);
};

// Create new user
exports.createUser = (userData, callback) => {
  const { name, email, password, role, status} = userData;

  const query = "INSERT INTO users (name,email,password,role,status) VALUES ($1, $2, $3, $4, $5)";

  const values = [name, email, password, role, status];

  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

// Update user
exports.updateUser = (id, userData, callback) => {
  const { name, email, password, role, status} = userData;

  const query = "UPDATE users SET name = $1, email = $2, password = $3, role = $4, status = $5 WHERE id = $6";

  const values = [name, email, password, role, status, id];

  db.query(query, values, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, result);
  });
};

// Delete user
exports.deleteUser = (id, callback) => {
  db.query("DELETE FROM users WHERE id = $1", [id], callback);
};