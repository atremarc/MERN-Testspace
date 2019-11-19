//import packages
const router = require('express').Router();
const bodyParser = require('body-parser');

//import files
const User = require('../models/userModel');

//init bodyParser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//get all contents of test.users
router.get('/getall', (req, res) => {
  User.find({}, (error, allUsers) => {
    if(error) {
      return res.send({
        success: false,
        message: 'Get All Users failed: .find() error'
      });
    } else {
      return res.send({
        success: true,
        message: 'Get All Users succeeded',
        list: allUsers
      });
    }
  });
});

//add user to test.users
router.post('/adduser', (req, res) => {
  const { body } = req;
  const { username, email } = body;

  if(!username) {
    return res.send({
      success: false,
      message: 'Add User failed: no username'
    });
  }
  if(!email) {
    return res.send({
      success: false,
      message: 'Add User failed: no email'
    });
  }

  User.find({ email: email }, (error, previousUser) => {
    if(error) {
      return res.send({
        success: false,
        message: 'Add User failed: .find() error'
      });
    } else if (previousUser.length > 0) {
      return res.send({
        success: false,
        message: 'Add User failed: user already exists'
      });
    } else {
      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.save((error, newUser) => {
        if(error) {
          return res.send({
            success: false,
            message: 'Add User failed: .save() error'
          });
        } else {
          return res.send({
            success: true,
            message: 'Add User succeeded'
          });
        }
      });
    }
  });
});

module.exports = router;
