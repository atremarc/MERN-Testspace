const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  email: String,
  idToken: String,
  accessToken: String
});

const Session = mongoose.model('session', sessionSchema);

module.exports = Session;
