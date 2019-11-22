//import packages
const router = require('express').Router();
const bodyParser = require('body-parser');
const {OAuth2Client} = require('google-auth-library');

//import files
const User = require('../models/userModel');
const keys = require('../config/keys');

//init bodyParser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//verify token
async function verify(token, client) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: keys.google.clientID,
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const domain = payload['hd'];
  const email = payload['email']
  console.log('User ID: ' + userid);
  console.log('Domian: ' + domain);
  console.log('Email: ' + email);

  var result = '';

  User.find({email: email}, (error, user) => {
    if(error) {
      result = error;
    } else if (user.length === 0) {
      result = 'this user is not in the database';
    } else {
      result = 'this user is in the database';
    }
    console.log(result);
  });
}

//recieve token id from frontend
router.post('/google', (req, res) => {
  const body = req.body.tokenID;
  const client = new OAuth2Client(keys.google.clientID);

  verify(body, client).catch(console.error);
  return res.send('token sent to backend');
});

module.exports = router;
