'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Data = require('../models/todo');
const Message = require('../models/message');

const bcrypt = require('bcryptjs');
//Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
     name: req.body.name,
     email: req.body.email,
     username: req.body.username,
     password: req.body.password,
     role: req.body.role,
     device: req.body.device
});

  User.addUser(newUser, (err, user) => {
   if(err){
     res.json({success: false, msg:'Failed to register'});
   } else {
     res.json({success: true, msg:'User registered'});
   }
  });
});
//delete user
router.post('/delete', (req, res, next) => {
  const user = req.body.name;
 User.getUserByName(user, (err, user) => {
    if(err) throw err;

   var delId = user._id;

   User.findByIdAndRemove(delId , function(err) {
   if (err){
     res.send('something went wrong');
     next();
     }
   res.json({
          success: true,
  });
  });


 });

});
//password change
router.post('/passchange', (req, res, next) => {
  const user = req.body.username;
  const pass = req.body.password;
  User.getUserByName(user, (err, user) => {
    if(err) throw err;

   var passId = user._id;
   var newpass = pass;
   var vm = this;
   var changepass = function (newpass,callback){
   bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(newpass, salt, (err, hash) => {
    if(err) throw err;
    User.findByIdAndUpdate(passId ,{password: hash}, function(err) {
     if (err){
     res.send('something went wrong');
     next();
     }
   res.json({
          success: true,
    });
   });     
   });
  });
}
   changepass(newpass, (err, user) => {
   if(err){
   throw err;
   }
  });
  

 });
 });


//Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 //1 week 
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            device: user.device
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

//Dashboard get patients for doctor
router.get('/dashboard', (req, res, next) => {
  User.find({role:'Patient'}, function(err,users) {
   if (err){
     res.send('something went wrong');
     next();
     }
     res.json({users:{users}});
  });
});
//Dashboard get Data
router.get('/dashboard2', (req, res, next) => {
  Data.find({},function(err,data){
   if (err){
    res.send('something went wrong data');
    next();
   }
   res.json({data});
   });
});
//Dashboard name check
router.post('/dashboard3', (req, res, next) => {
  const nameCH = req.body.name;
  User.find({name:nameCH},function(err,user){
   if (err){
    res.send('something went wrong data');
    next();
   }
   res.json({
          success: true,
          user: user

        });

   });
});
//Get chat history
router.post('/chatget', (req, res, next) => {
  const username = req.body.name;
  Message.find({
   $or:[{Sender:username},{Recipient:username}]},function(err,message){
   if (err){
    res.send('something went wrong data');
    next();
   }
   res.json({
          success: true,
          message: message

        });
   });
});
//send message
router.post('/chatsend', (req, res, next) => {
  let newMessage = new Message({
     Sender: req.body.Sender,
     Recipient: req.body.Recipient,
     Message: req.body.Message,
     Time: req.body.Time
});

  newMessage.save((err) => {
   if(err){
     res.json({success: false, msg:'Failed to send'});
   } else {
     res.json({success: true, msg:'Message Sent'});
   }
  });
});
//get list of doctors
router.get('/getdocs', (req, res, next) => {
  User.find({role:'Doctor'}, function(err,users) {
   if (err){
     res.send('something went wrong');
     next();
     }
     res.json({users:{users}});
  });
});

module.exports = router;

