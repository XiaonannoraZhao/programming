const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlCode: String,
  //old url
  longUrl: String, 
  //constract url
  shortUrl: String,
  date: { type: String, default: Date.now }
});
//pass it to schema 
module.exports = mongoose.model('Url', urlSchema);
//mongoose.connect("mongodb://localhost:5000");