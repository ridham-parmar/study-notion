const Course = require('../models/Course');
const Profile = require('../models/Profile') ;
const User = require('../models/User') ;
const {uploadFileToCloudinary} = require('../util/fileUploader') ;
require('dotenv').config() ;

// update Profile
exports.updateProfile = async(req, res) => {
    try {
        // fetching data
        const {profession, gender, about, dateOfBirth, contactNumber} = req.body ;
         
        // find profile
        const id = req.user.id ;
        
        // validation
        if(!profession || !gender || !about || !dateOfBirth || !contactNumber) {
            return res.status(400).json({
                success:false,
                message:'Please enter your email correctly'
            })
        }
        
        // 
        const userDetails = await User.findById(id) ;
        const profileId = userDetails.additionalDetails ;
        const profileDetails = await Profile.findById(profileId) ;
        
        if(!profileDetails) {
            return res.status(404).json({
                success:false,
                message:'User not found'
            })
        }
        
        // update profileDetails
        const updatedProfile = await Profile.findByIdAndUpdate(
            {_id: profileId},
            {
                profession: profession,
                gender: gender,
                about: about,
                dateOfBirth: dateOfBirth,
                contactNumber: contactNumber
            },
            {new:true}
        )
        console.log("Printing updatedProfile: ", updatedProfile) ;
        return res.status(200).json({
            success:true,
            message:'Profile updated Successfully',
            data:updatedProfile
        })
    } catch (error) {
        console.log('Error while updating profile: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while updating profile',
            error:error.message
        })
    }
}

// delete User
//Explore -> how can we schedule this deletion operation
exports.deleteUser = async(req, res) => {
    try {
        // fetching id 
        const id = req.user.id ;

        const userDetails = await User.findById(id) ;

        // validation
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:'User not found',
            })
        }
        //TOOD: HW unenroll user form all enrolled courses
        // userDetails.courses.forEach((cid) => {
        //     const updatedCourse = await Course.findByIdAndUpdate(
        //                                                 cid,
        //                                                 {$pull: {studentsEnrolled: new mongoose.Types.ObjectId(id)}},
        //                                                 {new:true}) ;

        // });
        // if user found then delete user, profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails) ;

        // delete user
        await User.findByIdAndDelete(id) ;

        return res.status(200).json({
            success:true,
            message:'User account deleted successfully',
        })
    } catch (error) {
        console.log('Error while deleting user profile: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while deleting user profile',
            error:error.message
        })
    }
}

// get all user details
exports.getAllUserDetails = async (req, res) => {
    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:'User Data Fetched Successfully',
            data:userDetails
        });
       
    }
    catch(error) {
        console.log('Error while fetching all user details: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while fetching all user details',
            error:error.message
        });
    }
}

//updateDisplayPicture
exports.updateProfilePicture = async(req, res) => {
    try {
        // fetching userProfileImage
        const userImage = req.files.userImage ;

        // fetch userId
        const id = req.user.id ;

        // validation
        if(!userImage || !id) {
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        // upload image to cloudinary
        let uploadedImage ;
        try {
            uploadedImage = await uploadFileToCloudinary(userImage, process.env.FOLDER_NAME, 1000, 1000) ;
        } catch (error) {
            console.log("Error while uploading image to cloudinary: ", error) ;
            return res.status(401).json({
                success:false,
                message:"Error while uploading image to cloudinary",
                error:error.message
            })
        }

        // update image from User model in db
        const updatedUserDetail = await User.findByIdAndUpdate(id,
                                            {image: uploadedImage.secure_url},
                                            {new:true}) ;

        return res.status(200).json({
            success:true,
            message:'User profile image updated successfully',
            data:updatedUserDetail
        })
    } catch (error) {
        console.log('Error while updating user image: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while updating user image',
            error:error.message
        });
    }
}

// getEnrolledCourses
exports.getEnrolledCourses = async(req, res) => {
    try {
        // fetch userId
        const id = req.user.id ;
        // console.log("Priting userId: ", id) ;
        // find user with given id
        const user = await User.findById(id).populate('courses').exec() ;

        // validation
        if(!user) {
            return res.status(404).json({
                success:false,
                message: `User not found with given ${id}`
            })
        }

        return res.status(200).json({
            success:true,
            message: 'Fetched all enrolled courses',
            data:user.courses
        })
    } catch (error) {
        console.log('Error while fetching enrolled courses: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while fetching enrolled courses',
            error:error.message
        });
    }
}
