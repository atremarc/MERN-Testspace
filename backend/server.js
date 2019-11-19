//import packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

//import files
const keys = require('./config/keys');
const dbRoutes = require('./routes/dbRoutes');
const authRoutes = require('./routes/authRoutes');
const passportSetup = require('./config/passportSetup');

//init express
const app = express();

//cors options
const options = {
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

//enable cors
app.use(cors(options));

//initialize cookieSession
app.use(cookieSession({
  maxAge: keys.session.maxAge,
  keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongoDB
mongoose.connect(keys.mongoDB.dbURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('connected to mongoDB');
});

//test route
app.get('/test', (req, res) => {
  res.send('backend online');
});

//add routers
app.use('/db', dbRoutes);
app.use('/auth', authRoutes);

//enable listening on port 9000
app.listen(9000, () => {
  console.log('the server is listening for requests on port 9000');
});
