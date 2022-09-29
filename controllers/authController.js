const User = require("../models/User");

const returnSignupPage = (req, res) => {
  res.render("signup");
};

const returnLoginPage = (req, res) => {
  res.render("login");
};

const createUser = async (req, res) => {
  try {
    //Create a user in the db
    const user = await User.create(req.body);
    res.json({user: user._id})
  } catch (err) {
    res.json({ errors: {
        email : "",
        password: ""
    } });
  }
};

const loginUser = (req, res) => {
  //Code
};

const logoutUser = (req, res) => {};

module.exports = {
  returnSignupPage,
  returnLoginPage,
  createUser,
  loginUser,
  logoutUser,
};
