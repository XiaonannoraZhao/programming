const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
//connect database
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
//so it can run in the index 
module.exports = connectDB;