const Course = require('../models/Course') ;
const User = require('../models/User') ;
const Category = require('../models/Category') ;
const {uploadFileToCloudinary} = require('../util/fileUploader') ;
require('dotenv').config() ;

// createCourse
exports.createCourse = async(req, res) => {
    try {
        // fetching all data from body
        let {courseName, courseDescription, whatYouWillLearn, price, category, tag, status, instructions, language} = req.body ;

        // fetching image from req.files
        const thumbnail = req.files.thumbnailImage ;
        
        // checking all details 
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag || !instructions || !language) {
            return res.status(400).json({
                success:false,
                message:'Please fill all the details'
            })
        }

        if (!status || status === undefined) {
			status = "Draft";
		}

        // fetching instructor's id 
        const userId = req.user.id ;
        // fetched instructor's data based on userId
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor"
        }) ;
        
        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        // checking if tag is valid , not necessary in case of dropdown in UI, necessary in case of postman hit
        const categoryDetails = await Category.findById(category) ;
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:"Category details not found"
            })
        }
        
        // uploading image to cloudiary
        let uploadedImage;
        try {
            uploadedImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME) ;
        } catch (error) {
            console.log("Error while uploading image to cloudinary: ", error) ;
            return res.status(401).json({
                success:false,
                message:"Error while uploading image to cloudinary"
            })
        }

        // creating entry in db
        const courseEntry = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            instructions,
            language,
            instructor:instructorDetails._id,
            category:categoryDetails._id,
            thumbnail:uploadedImage.secure_url
        })
        
        // adding an id of created course in courses array of user model
        const updatedInstructorDetails = await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {$push: {courses:courseEntry._id}}, 
            {new:true}) ;

        //adding an id of created course in courses array of Tag model
        const updatedCategoryDetails = await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {$push: {courseId: courseEntry._id}},
            {new:true}) ;

        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:courseEntry
        })
    } catch (error) {
        console.log("Error while creating course: ", error) ;
        return res.status(500).json({
            success:false,
            message:"Error while creating course",
            error:error.message
        })
    }
}

// find all courses
exports.getAllCourses = async(req, res) => {
    try {
        const courses = await Course.find({}, {
            courseName:true,
            courseDescription:true,
            instructor:true,
            whatYouWillLearn:true,
            price:true,
            category:true,
            thumbnail:true
        }).populate("instructor").exec() ;

        return res.status(200).json({
            success:true,
            message:'Courses fetched successfully',
            data:courses
        })
    } catch (error) {
        console.log("Error while fetching courses: ", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while fetching coures',
            error:error.message
        })
    }
}

//getCourseDetails
exports.getCourseDetails = async(req, res) => {
    try {
        // fetch courseId
        const {courseId} = req.body ;

        // validation
        if(!courseId) {
            return res.status(401).json({
                success:false,
                message:'Invalid course Id'
            })
        }

        // find course related to corresponding courseId from db
        const courseDetails = await Course.findById(courseId)
                                                .populate(
                                                    {
                                                        path:"instructor",
                                                        populate:{
                                                            path:"additionalDetails"
                                                        }
                                                    }
                                                )
                                                .populate(
                                                    {
                                                        path:"courseContent",
                                                        populate:{
                                                            path:"subsection"
                                                        }
                                                    }
                                                )
                                                .populate("ratingAndReviews")
                                                .populate("category")
                                                .exec() ;

        // in case if course details not found
        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Course Details Not Found'
            })
        }

        // return response
        return res.status(200).json({
            success:true,
            message:'Fetched course details',
            data:courseDetails
        })
    } catch (error) {
        console.log("Error while fetching course details: ", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while fetching course details',
            error:error.message
        })
    }
}