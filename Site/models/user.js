const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');






//User Schema
const UserSchema = mongoose.Schema({
 name: {
  type: String
 },
 email: {
  type: String,
  require: true
 },
 username: {
  type: String,
  require: true
 },
 password: {
  type: String,
  required: true
 },
 role: {
  type: String,
  required: true
 },
 device: {
  type: String,
  required: false
 }
});
 

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.getUserByName = function(name, callback){
  const query = {name: name}
  User.findOne(query, callback);
}

module.exports.getUsers = function( callback){
  User.find(callback);
}


module.exports.addUser = function (newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(newUser.password, salt, (err, hash) => {
    if(err) throw err;
    newUser.password = hash;
    newUser.save(callback);
   });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

