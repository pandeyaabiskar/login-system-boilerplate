const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
  const errors = {
    email: "",
    password: "",
  };

  if(err.message === "incorrect email"){
    errors.email = "Email is incorrect"
    return errors
  }
  if(err.message === "incorrect password"){
    errors.password = "Password is incorrect"
    return errors
  }

  if (err.code === 11000) {
    errors.email = "Email already exists";
    return errors;
  }

  if (err._message === "User validation failed") {
    Object.values(err.errors).map(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

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
    //Create a token and send it in cookie
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token);

    res.json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors: errors });
  }
};

const loginUser = async (req, res) => {
  //Code
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("jwt", token);
        res.json({ user: user._id });
      } else {
        throw Error("incorrect password");
      }
    } else {
      throw Error("incorrect email");
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors: errors });
  }
};

const logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  returnSignupPage,
  returnLoginPage,
  createUser,
  loginUser,
  logoutUser,
};
