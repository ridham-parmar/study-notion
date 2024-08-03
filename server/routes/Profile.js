const express = require('express') ;
const router = express.Router() ;


//  importing controllers for updating user profile
const { updateProfile, deleteUser, getAllUserDetails, updateProfilePicture, getEnrolledCourses} = require('../controllers/Profile') ;
// importing controllers for reset password and reset password token
const { resetPasswordToken, resetPassword, changePassword } = require('../controllers/ResetPassword') ;

// importing middlewares 
const { auth } = require('../middlewares/auth') ;

// *********************************** Profile routes  ********************************************************
// Route for updaitng user profile-post
router.put('/updateProfile', auth, updateProfile) ;

// Route for deleting user profile-delete
router.delete('/deleteProfile', auth, deleteUser) ;

// Route for fetching user profile details-get
router.get('/getUserDetails', auth, getAllUserDetails) ;

// Route for updating user profile picture-post
router.put('/updateDisplayPicture', auth, updateProfilePicture) ;

// Route for fetching enrolled courses for student-get
router.get('/getEnrolledCourses', auth, getEnrolledCourses) ;

// ***********************************  Reset Password routes ********************************************************
// Route for reset password token
router.post('/reset-password-token', resetPasswordToken) ;

// Route for reset password
router.put('/reset-password', resetPassword) ;

// ***********************************  Change Password routes ********************************************************
// Route for changePassword-put
router.post('/change-old-password', auth, changePassword) ;

module.exports = router ;

