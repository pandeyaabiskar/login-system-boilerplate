const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const { jwt: token } = req.cookies;
  try {
    jwt.verify(token, "mern-secret");
    next();
  } catch (err) {
    console.log(err)
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
