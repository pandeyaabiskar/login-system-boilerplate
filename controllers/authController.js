const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const returnSignupPage = (req, res) => {
    res.render('signup')
}

const returnLoginPage = (req, res) => {
    res.render('login')
}

const createUser = async (req, res) => {
    const {email, password} = req.body;
    const user = new User({email,password})
    try{
        //Generate salt for the password 
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt)
        await user.save();
        //Token create
        const token = jwt.sign({id: user._id}, 'mern-secret', {
            expiresIn: 24*60*60
        })
        // res.setHeader('Set-Cookie', `jwt=${token}`)
        res.cookie('jwt', token, {maxAge: 24*60*60*1000})
        res.send({id: user._id})
    }catch(err){
        console.log(err)
    }
}

const loginUser = (req, res) => {
    //Code
}

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {maxAge : 1});
    res.redirect('/')
}

module.exports = {
    returnSignupPage,
    returnLoginPage,
    createUser,
    loginUser,
    logoutUser
}