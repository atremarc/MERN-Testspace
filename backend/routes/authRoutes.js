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

//find user
async function findUser(email) {

  const user = await User.find({email: email}, (error, user) => {
    if(error) {
      console.log(error);
    } else if (user.length === 0) {
      console.log('this user is not in the database');
    } else {
      console.log('this user is in the database');
    }
  });
  console.log(user.length);
  if (user.length > 0) {
    return true;
  } else {
    return false;
  }
}

//verify token
async function verify(idToken, accessToken, client) {

  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: keys.google.clientID,
  });

  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const domain = payload['hd'];
  const email = payload['email'];
  console.log('User ID: ' + userid);
  console.log('Domian: ' + domain);
  console.log('Email: ' + email);

  return {
   email: email,
   accessToken: accessToken
 };
}

//recieve token id from frontend, verify it, and send session back in response
router.post('/google', async (req, res) => {
  const idToken = req.body.tokenID;
  const accessToken = req.body.accessToken;
  const client = new OAuth2Client(keys.google.clientID);

  const session = await verify(idToken, accessToken, client).catch(console.error);
  console.log('Session to check against DB: ', session);

  var checkedSession = {};

  if(await findUser(session.email)) {
    checkedSession = {
      email: session.email,
      accessToken: session.accessToken
    };
  } else {
    checkedSession = {};
  }

  return res.send(checkedSession);
});

//check access token and return ALLOWED or NOT ALLOWED
router.post('/protected', async (req, res) => {
  const accessToken = req.body.accessToken;
  try {
    const client = new OAuth2Client(keys.google.clientID);
    const tokenInfo = await client.getTokenInfo(accessToken);
    console.log(tokenInfo);
    return res.send('ALLOWED');
  } catch (error) {
    console.log(error);
    return res.send('NOT ALLOWED');
  }
});

module.exports = router;
