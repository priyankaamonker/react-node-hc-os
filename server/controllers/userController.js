const User = require("../models/userModel");

// Get all users
exports.getUsers = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get user by ID
exports.getUser = (req, res) => {
  User.getUserById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(results.rows[0]);
  });
};

// Create a new user
exports.createUser = (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    status: req.body.status
  };

  User.createUser(userData, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User created", userId: results });
  });
};

// Update user
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const userData = req.body;

  User.updateUser(id, userData, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User updated" });
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  User.deleteUser(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted" });
  });
};