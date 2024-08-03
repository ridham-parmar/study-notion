const mongoose = require('mongoose') ;

const ratingAndReviewSchema = new mongoose.Schema(
    {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        review: {
            type:String,
            required:true,
            trim:true
        },
        rating: {
            type:Number,
            required:true,
            trim:true
        },
        // check this out later
        course: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "Course",
            index: true,
        },
    }
)

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema) ;