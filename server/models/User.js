const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type:String,
            required:true,
            trim:true
        },
        lastName: {
            type:String,
            required:true,
            trim:true
        },
        email: {
            type:String,
            required:true,
            trim:true
        },
        password: {
            type:String,
            required:true,
        },
        accountType: {
            type:String,
            enum:["Admin", "Student", "Instructor"],
            required:true
        },
        phoneNumber: {
            type:Number,
            trim:true
        },
        image: {
            type:String,
            trim:true
        },
        token: {
            type:String
        },
        resetPasswordExpiry: {
            type: Date
        },
        additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        },
        courses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ],
        courseProgress: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: "CourseProgress"
            }
        ],
        // check out later
        // active: {
		// 	type: Boolean,
		// 	default: true,
		// },
		// approved: {
		// 	type: Boolean,
		// 	default: true,
		// },
    },
    // Add timestamps for when the document is created and last modified
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema) ;