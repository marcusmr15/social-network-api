// Import required packages and files
require('dotenv').config(); // Add this line to load environment variables from .env file
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set up environment variables
const PORT = process.env.PORT || 3001;
const app = express();

// Use middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes defined in routes.js
app.use(routes);

// Connect to the MongoDB database
db.once('open', () => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
