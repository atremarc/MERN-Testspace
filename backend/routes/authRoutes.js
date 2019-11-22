//import packages
const router = require('express').Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const {OAuth2Client} = require('google-auth-library');
const GoogleAPI = require('googleapis');
const jwt = require('jsonwebtoken');

//import files
const User = require('../models/userModel');
const keys = require('../config/keys');

//init bodyParser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



//receive user details from frontend (v1)
router.post('/google', (req, res) => {
  const { body } = req;
  console.log(body);
});

//receive request to auth from front end (v2)
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}), (req, res) => {
  console.log(req.user);
});

// callback route for google to redirect to (v2)
router.get('/google/redirect', (req, res) => {
  console.log('you reached the redirect URI');
  res.send('you reached the redirect URI');
});

//verify token function (v4)
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

//recieve token id (v4)
router.post('/googlev4', (req, res) => {
  const body = req.body.tokenId;
  console.log(body);
  const client = new OAuth2Client(keys.google.clientID);
  verify(body, client).catch(console.error);
  return res.send('token sent');

});

module.exports = router;
