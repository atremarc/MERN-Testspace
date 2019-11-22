//import packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//import files
const keys = require('./config/keys');
const dbRoutes = require('./routes/dbRoutes');
const authRoutes = require('./routes/authRoutes');

//init express
const app = express();

//enable cors
app.use(cors());

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
