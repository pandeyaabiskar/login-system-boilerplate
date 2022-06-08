const { Router } = require('express');
const {returnSignupPage, returnLoginPage, createUser, loginUser} = require('../controllers/authController')
const router = Router();

router.get('/signup', returnSignupPage)
router.post('/signup', createUser)
router.get('/login', returnLoginPage)
router.post('/login', loginUser)

module.exports = router