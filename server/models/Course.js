const mongoose = require('mongoose') ;

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type:String,
            required:true,
            trim:true
        },
        courseDescription: {
            type:String,
            required:true,
            trim:true
        },
        instructor: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
        language: {
            type:String,
            trim:true
        },
        price: {
            type:Number,
            required:true,
            trim:true
        },
        whatYouWillLearn: {
            type:String,
            required:true,
            trim:true
        },
        courseContent: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Section"
            }
        ],
        ratingAndReviews: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"RatingAndReview",
            }
        ],
        thumbnail: {
            type:String,
            required:true
        },
        category: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        tag: {
            type:String,
            // required: true,
        },
        studentsEnrolled: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                // required:true
            }
        ],
        instructions: {
            type: String,
        },
        // added extra : check later
        status: {
            type: String,
            enum: ["Draft", "Published"],
        },
    }
)

module.exports = mongoose.model("Course", courseSchema) ;