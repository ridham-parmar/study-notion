const User = require('../models/User') ;
const OTP = require('../models/OTP') ;
const Profile = require('../models/Profile') ;
const otpGenerator = require('otp-generator') ;
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;
require('dotenv').config() ;


//send otp for email verification
exports.sendOTP = async(req, res) => {
    try {
        // console.log("req ki body : ", req) ;
        // fetching email from req.body
        const { email } = req.body ;
        // console.log("email from server : ", email ) ;
        
        // check if user already exists
        const isUSerExists = await User.findOne({email}) ;

        // if user already exists then return res, that please login
        if(isUSerExists) {
            return res.status(403).json({
                success:false,
                message:'User already registered, kindly login'
            })
        }

        // user is not registered, so generate otp
        var otp = otpGenerator.generate(6, {
            specialChars:false,
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false
        })
        // console.log("OTP generated: ", otp) ;

        // checking unique otp from db
        let result = await OTP.findOne({otp: otp}) ;
        // console.log("printing result : ", result) ;

        while(result) {
            otp = otpGenerator.generate(6, {
                specialChars:false,
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false
            })
            result = await OTP.findOne({otp: otp}) ;
        }

        // console.log("otp : ", otp)
        // console.log("email : ", email) ;
        
        const payload = {email, otp} ;

        // creating entry in db
        const otpEntry = await OTP.create(payload) ;

        // console.log("entry created ") ;

        return res.status(200).json({
            success:true,
            message:'OTP generated Successfully',
            data:otpEntry
        }) 

    } catch (error) {
        console.log("error while otp generation: ",error) ;
        return res.status(500).json({
            success:false,
            message:'Error while OTP generation',
            error:error.message
        })
    }
}



//signup
exports.signup = async(req, res) => {
    // console.log("in signup server ") ;
    try {
        // fetching datafrom req.body
        const {
            firstName,
            lastName,
            email,
            accountType,
            createPassword,
            confirmPassword,
            phoneNumber,
            otp
        } = req.body ;
        
        // check data if any empty or not filled
        if(!firstName || 
            !lastName || 
            !email ||
            !createPassword || 
            !confirmPassword || 
            !phoneNumber ||
            !otp) {
                return res.status(400).json({
                    success:false,
                    message:'Please fill all the details'
                })
        }
        
        // checking if user exists or not
        const isUSerExists = await User.findOne({email}) ;

        if(isUSerExists) {
            return res.status(403).json({
                success:false,
                message:'User already registered, kindly login'
            })
        }

        // checking password equality
        if(createPassword !== confirmPassword) {
            return res.status(401).json({
                success:false,
                message:'Create password & confirm password are not matching, please ensure both passwords are correct'
            })
        }
        
        // finding latest otp entry in db
        const recentOtp = await OTP.find({otp}).sort({createdAt:-1}).limit(1) ;
        
        if(recentOtp.length === 0) {
            return res.status(400).json({
                success:false,
                message:'OTP expired, Please regenerate it'
            })
        } else if(recentOtp[0].otp !== otp) {
            return res.status(400).json({
                success:false,
                message:'Please enter valid OTP'
            })
        }
        
        // as otp is verified, now hash password
        const encryptedPassword = await bcrypt.hash(createPassword, 10) ;

        // Create the user
		// let approved = "";
		// approved === "Instructor" ? (approved = false) : (approved = true);
        
        // creating an entry of additionaldetails as a null as they arn't necessary
        const profileDetails = await Profile.create({
            profession:null,
            gender:null,
            about:null,
            dateOfBirth:null,
            phoneNumber:null
        })

        // now make an entry in db
        const user = await User.create({
            firstName,
            lastName,
            email,
            accountType,
            phoneNumber,
            password:encryptedPassword,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            additionalDetails:profileDetails._id
        })

        return res.status(200).json({
            success:true,
            message:'User registration successful',
            data:user
        })
    } catch (error) {
        console.log("error while signup: ",error) ;
        return res.status(500).json({
            success:false,
            message:'User registration failed, try after some time',
            error:error.message
        })
    }

}

//login controller for authenticating user
exports.login = async(req, res) => {
    try {
        // fetch data from req ki body
        const {email, password} = req.body ;

        // checking if they empty 
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'Please fill all the details'
            })
        }

        // checking if user exists
        let user = await User.findOne({email}).populate("additionalDetails"); ;
        if(!user) {
            return res.status(404).json({
                success:false,
                message:'User is not registered, Kindly register first'
            })
        }

        // checking password
        if (await bcrypt.compare(password, user.password)) {
            // generating jwt token
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"24h"
            })

            // save token to user document in db
            user.token = token ;
            user.password = undefined ;
            
            // sending cookie with token as a response
            const options = {
                httpOnly: true,
                expires: new Date( Date.now() + 3 * 24 * 3600 * 1000) 
            }
            return res.cookie("token", token, options).status(200).json({
                success:true,
                message: 'Logged in successfully',
                user,
                token,
            })
        } else {
            return res.status(401).json({
                success:false,
                message:'Incorrect password'
            });
        }
    } catch (error) {
        console.log("Error while logging in: ", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while logging in',
            error:error.message
        })
    }
}

