const express = require('express') ;
const router = express.Router() ;

// importing controllers for login, signup and authentication
const {signup, login, sendOTP} = require('../controllers/Auth') ;


// *********************************** Authentication routes ********************************************************
// Route for signup-post
router.post('/signup', signup) ;

// Route for login-post
router.post('/login', login) ;

// Route for sendOTP-post
router.post('/sendotp', sendOTP) ;


module.exports = router ;

