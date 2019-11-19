const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./keys');
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
  done( null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: ''
    }, (accessToken, refreshToken, email, done) => {
      console.log(email);
    })
  );
