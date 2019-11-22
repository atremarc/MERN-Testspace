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
}

//recieve token id from frontend
//recieve token id (v4)
router.post('/google', (req, res) => {
  const body = req.body.tokenID;
  console.log(body);
  const client = new OAuth2Client(keys.google.clientID);
  verify(body, client).catch(console.error);
  return res.send('token sent');
});

module.exports = router;
