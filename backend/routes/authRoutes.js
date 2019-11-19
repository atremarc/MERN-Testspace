//import packages
const router = require('express').Router();
const passport = require('passport');

// auth with google
router.post('/google', passport.authenticate('google', {
  scope: ['email']
}));

module.exports = router;
