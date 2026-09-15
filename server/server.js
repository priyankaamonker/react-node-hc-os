require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require('./routes/documentRoutes');

const port = process.env.PORT;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World from Express.js!');
});
app.use("/users", userRoutes);
app.use('/api/documents', documentRoutes); // OpenSearch document routes


app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});