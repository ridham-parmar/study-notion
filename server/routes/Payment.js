const express = require('express') ;
const router = express.Router() ;

// import controllers for capturePayment & verifySignature
const { capturePayment, verifySignature } = require('../controllers/Payments') ;

// import middlewares
const { auth, isStudent, isInstructor, isAdmin} = require('../middlewares/auth') ;

// *********************************** Profile routes  ********************************************************
// Route for capturePayemnt-post
router.post('/capturePayment', auth, isStudent, capturePayment) ;
// Route for verifySignature
router.post('/verifySignature', verifySignature) ;

module.exports = router