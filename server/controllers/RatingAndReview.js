const RatingAndReview = require('../models/RatingAndReview') ;
const Course = require('../models/Course') ;
const mongoose = require('mongoose') ;

// createRatingAndReview
exports.createRatingAndReview = async(req, res) => {
    try {
        // fetch userId
        const userId = req.user.id ;

        // fetch other data
        const {rating, review, courseId} = req.body ;

        // validation
        if(!userId || !rating || !review || !courseId) {
            return res.status(400).json({
                success:false,
                message:'All details required'
            })
        }

        // check if student is enrolled in course 
        const isEnrolled = await Course.findOne(
                                        {courseId,
                                        studentsEnrolled: {$elemMatch: {$eq: userId}}
                                        }) ;
        if(!isEnrolled) {
            return res.status(403).json({
                success:false,
                message:'You have no rigths for rating and review'
            })
        }

        // check if student has already given rating and reviews
        const isGiven = await RatingAndReview.findOne({user:userId}) ;

        if(isGiven) {
            return res.status(403).json({
                success:false,
                message:'You can give rating and review for first time'
            })
        }

        // create RatingAndReview
        const ratingAndReview = await RatingAndReview.create(
                                                {
                                                    user:userId,
                                                    review,
                                                    rating,
                                                    course:courseId
                                                }) ;

        // push RatingAndReviewId in array of ratingAndReview from course model
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                {_id:courseId},
                                                {$push: {ratingAndReviews: ratingAndReview._id}},
                                                {new:true}) ;
        // return res
        return res.status(200).json({
            success:true,
            message:'Rating and Review created in db',
            data:updatedCourseDetails
        })
    } catch (error) {
        console.log('Error while creating rating and review: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while creating rating and review',
            error:error.message
        })
    }
}

// getAverageRating
exports.getAverageRating = async(req, res) => {
    try {
        // fetch courseId
        const {courseId} = req.body ;
        // validation
        if(!courseId) {
            return res.status(400).json({
                success:false,
                message:'Invalid courseId'
            })
        }

        // aggregation, here result will represent an array
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "$rating"}
                }
            }
        ])

        // if averageRating is not zero
        if(result[0].averageRating > 0) {
            return res.status(200).json({
                success:true,
                message:'Average rating calculated successfully',
                averageRating: result[0].averageRating
            })
        }

        // if averageRating is zero
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating: 0
        })

    } catch (error) {
        console.log('Error while calculating average rating: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while calculating average rating',
            error:error.message
        })
    }
}

// get All ratings and review
exports.getAllRatingAndReview = async(req, res) => {
    try {
         const allRatingAndReview = await RatingAndReview.find({})
                                                        .sort({rating: "desc"})
                                                        .populate(
                                                            {
                                                                path:"user",
                                                                select: "firstName lastName email image"
                                                            }
                                                        )
                                                        .populate(
                                                            {
                                                                path:"course",
                                                                select:"courseName"
                                                            }
                                                        )
                                                        .exec() ;

        return res.status(200).json({
            success:true,
            message: 'fetched all rating and review successfully',
            data: allRatingAndReview
        })
    } catch (error) {
        console.log('Error while fetching all rating and review : ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while fetching all rating and review',
            error:error.message
        })
    }
}

// get rating and review depending on courseId
exports.getAllRatingAndReviewByCourseId = async(req, res) => {
    try {
        const {courseId} = req.body ;

        if(!courseId) {
            return res.status(400).json({
                success:false,
                message:'Invalid courseId'
            })
        }
        
        const allRatingAndReviewByCourseId = await RatingAndReview.find({course:courseId})
                                                                    .sort({rating: "desc"})
                                                                    .populate({
                                                                        path:"user",
                                                                        select:"firstName lastName email image"
                                                                    })
                                                                    .exec() ;

        return res.status(200).json({
            success:true,
            message: 'fetched all rating and review successfully',
            data: allRatingAndReviewByCourseId
        })
    } catch (error) {
        console.log('Error while fetching all rating and review by courseId : ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while fetching all rating and review by courseId ',
            error:error.message
        })
    }
}