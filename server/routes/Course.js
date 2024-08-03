const express = require('express') ;
const router = express.Router() ;

// importing controllers for courses creation, updation etc
const { createCourse, getAllCourses, getCourseDetails } = require('../controllers/Course') ;
// import controllers for section creation, updation, deletion etc
const { createSection, updateSection, deleteSection } = require('../controllers/Section') ;
// import controllers for sub-ection creation, updation, deletion etc
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/SubSection') ;
// import controllers for category fetching, creation etc
const { createCategory, getAllCategory, getCategoryPageDetail } = require('../controllers/Category') ;
// import controllers for rating & review creation, get average rating, get all review & rating etc
const { createRatingAndReview, getAverageRating, getAllRatingAndReview } = require('../controllers/RatingAndReview') ;

// importing middlewares
const { auth, isStudent, isInstructor, isAdmin} = require('../middlewares/auth') ;


// ******************************** Course routes  ********************************************************
// Route for creating course-post
router.post('/createCourse', auth, isInstructor, createCourse) ;
// Route for fetching all courses-get
router.get('/getAllCourses', getAllCourses) ;
// Route for fetching course details for particular course-get
router.get('/getCourseDetails', getCourseDetails) ;

// *********************** Section Route - only for Instructor  *******************************************
// Route for creating section-post
router.post('/createSection', auth, isInstructor, createSection) ;
// Route for updating section-put
router.put('/updateSection', auth, isInstructor, updateSection) ;
// Route for deleting section-delete
router.delete('/deleteSection', auth, isInstructor, deleteSection) ;

// *********************** SubSection Route - only for Instructor  *******************************************
// Route for creating sub-section-post
router.post('/createSubSection', auth, isInstructor, createSubSection) ;
// Route for updating sub-section-put
router.put('/updateSubSection', auth, isInstructor, updateSubSection) ;
// Route for deleting sub-section-delete
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection) ;

// *********************** Category Route - only for Admin ****************************************************
// Route for creating category-post
router.post('/createCategory', auth, isAdmin, createCategory) ;
// Route for fetching all categories-get
router.get('/getAllCategory', getAllCategory) ;
// Route for fetching page details by category-get
router.get('/getCategoryPageDetails', getCategoryPageDetail) ;

// ********************* Rating & Review Route - only for Student *********************************************
// Route for creating rating & review-post
router.post('/createRatingAndReview', auth, isStudent, createRatingAndReview) ;
// Route for fetching average rating
router.get('/getAverageRating', getAverageRating) ;
//  Route for fetching all rating and reviews
router.get('/getAllRatingAndReview', getAllRatingAndReview) ;

module.exports = router ;