// Importing the mongoose library
const mongoose = require('mongoose');

// Fetching the MongoDB URI from the environment variables
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

// Connecting to the MongoDB database using the MongoDB URI provided in the environment variables
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected...');
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

// Exporting the connection to the database as a module
module.exports = mongoose.connection;
