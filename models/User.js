const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
 email : {
   type: String,
   required: true,
   unique: true,
   validate: validator.isEmail
 },
 password : {
   type: String,
   required: true,
   minlength: 6
 }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;