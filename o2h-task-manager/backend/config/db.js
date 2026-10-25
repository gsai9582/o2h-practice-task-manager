const mongoose = require('mongoose');

function connectDB(mongoUri) {
  return mongoose.connect(mongoUri);
}

module.exports = { connectDB };

