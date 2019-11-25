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
          session_token: token
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
   session_token: token
 }
}

//recieve token id from frontend, verify it, and send session back in response
router.post('/google', async (req, res) => {
  const body = req.body.tokenID;
  const client = new OAuth2Client(keys.google.clientID);

  let cookie = await verify(body, client).catch(console.error);

  console.log('Cookie:' + cookie);
  return res.send(cookie);
});

module.exports = router;
