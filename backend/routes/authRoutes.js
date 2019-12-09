//import packages
const router = require('express').Router();
const bodyParser = require('body-parser');
const {OAuth2Client} = require('google-auth-library');

//import files
const User = require('../models/userModel');
const Session = require('../models/sessionModel');
const keys = require('../config/keys');

//init bodyParser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//verify token
async function verify(idToken, accessToken, client) {

  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: keys.google.clientID,
  });

  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const domain = payload['hd'];
  const email = payload['email']
  console.log('User ID: ' + userid);
  console.log('Domian: ' + domain);
  console.log('Email: ' + email);

  var message = '';

  try {
    await User.find({email: email},  async (error, user) => {
      if(error) {
        message = error;
      } else if (user.length === 0) {
        message = 'this user is not in the database';
      } else {
        message = 'this user is in the database';
        const session = new Session({
          email: email,
          idToken: idToken,
          accessToken: accessToken
        });

        try {
          await session.save( async (error, session) => {
            if (error) {
              console.log(error);
            } else {
              console.log('session saved');

            }
          });
        } catch (error) {
          console.log(error)
        }
        console.log(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
  return await {
   email: email,
   idToken: idToken,
   accessToken: accessToken
 }
}

//recieve token id from frontend, verify it, and send session back in response
router.post('/google', async (req, res) => {
  const idToken = req.body.tokenID;
  const accessToken = req.body.access_token;
  const client = new OAuth2Client(keys.google.clientID);

  let session = await verify(idToken, accessToken, client).catch(console.error);

  console.log('Session:' + session);
  return res.send(session);
});

//check access token and return ALLOWED or NOT ALLOWED
router.post('/protected', async (req, res) => {
  const accessToken = req.body.accessToken;
  console.log(accessToken);
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
