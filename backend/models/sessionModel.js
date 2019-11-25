const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  email: String,
  session_token: String
});

const Session = mongoose.model('session', sessionSchema);

module.exports = Session;
