const {instance} = require('../config/razorpay') ;
const Course = require('../models/Course') ;
const mongoose = require('mongoose') ;
const User = require('../models/User') ;
const {mailSender} = require('../util/mailSender') ;
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail') ;

exports.capturePayment = async(req, res) => {
    try {
        // fetching courseId from body
        const {courseId} = req.body ;
        // fetching userId from req.user.id
        const {userId} = req.user.id ;

        // validation on courseId
        if(!courseId) {
            return res.status(401).json({
                success:false,
                message:'Please enter valid courseId',
            })
        }
        
        let course ;
        try {
            course = await Course.findById(courseId) ;
            // checking if course exists with given courseId 
            if(!course) {
                return res.status(404).json({
                    success:false,
                    message:'Course not found',
                })
            }

            
            //here userId is of string type and userIds in array of student Enrolled in course are of ObjectId so convert userId from string to objectId type
            const uid = new mongoose.Types.ObjectId(userId) ;

            // checking if user is alredy enrolled in given course
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(401).json({
                    success:false,
                    message:'User is already enrolled in given course',
                })
            }
        } catch (error) {
            console.log("Error while checking enrollment of student:", error) ;
            return res.status(401).json({
                success:false,
                message:'Error while checking enrollment of student',
                error:error.message
            })
        }

    
        // before order creation u must some options to be passed 
        const amount = course.price ;
        const currency = "INR" ;

        const options = {
            amount : amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId,
                userId
            }

        }

        try {
            // order creation
            const paymentResponse = instance.orders.create(options) ;

            // return res
            return res.status(200).json({
                success:true,
                message:'Order created successfully',
                courseName: course.courseName,
                orderId: paymentResponse.id,
                amount: paymentResponse.amount,
                currency: paymentResponse.currency
            })
        } catch (error) {
            console.log("Error while order creation:", error) ;
            return res.status(401).json({
                success:false,
                message:'Error while order creation',
                error:error.message
            })
        }
    } catch (error) {
        console.log("Error while capture payment:", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while capture payment',
            error:error.message
        })
    }
}


// verify signature of Razorpay and server
exports.verifySignature = async(req, res) => {
    try {
        // define server's own webhook secret key
        const webHookSecret = "123456" ;

        //razorpay will send a secret key in req.headers in by hashing it for security 
        const signature = req.headers("x-razorpay-signature") ;
        
        // now coverting server's secret key in encrypted format in order to match it with razorpay's secret key
        const shasum = crypto.createHmac("sha256", webHookSecret) ;
        shasum.update(JSON.stringify(req.body)) ;
        const digest = shasum.digest("hex") ;

        // now compare keys
        if (signature === digest) {
            // Payment is authorised
            // now you can provide a course to particular student
            const {courseId, userId} = req.body.payload.payment.entity.notes ;

            // add userId in array of studentEnrolled from course model
            const enrolledCourse = await Course.findByIdAndUpdate(
                {courseId},
                {$push: {studentsEnrolled: userId}},
                {new:true}
            )
            
            // add courseId in array of courses from User model
            const userDetails = await User.findByIdAndUpdate(
                {userId},
                {$push: {courses: courseId}},
                {new:true}
            )

            // send mail for course enrollment confirmation
            await mailSender(
                userDetails.email,
                "Congratulation on Successful enrollment",
                courseEnrollmentEmail(enrolledCourse.courseName, `${userDetails.firstName} ${userDetails.lastName}`)
            )

            return res.status(200).json({
                success:true,
                message:'Signature verifies and Course enrolled successflly'
            });
        } else {
            return res.status(403).json({
                success:false,
                message:'Signature and webHookSecret do not match',
            })
        }
    } catch (error) {
        console.log("Error while signature verification:", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while signature verification',
            error:error.message
        })
    }
}