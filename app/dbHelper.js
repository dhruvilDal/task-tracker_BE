const mongoose = require('mongoose');
require('dotenv-safe').config();

// MongoDB URI
const uri = process.env.MONGO_DB_URL;

// Options for the connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(uri, options)
  .then(() => {
    console.log('MongoDB Connection Established');
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
  });

module.exports = mongoose;
