const User = require('../models/User') ;
const bcrypt = require('bcrypt') ;
const crypto = require('crypto') ;
// const mongoose = require('mongoose') ;
const { passwordUpdated } = require('../mail/templates/passwordUpdate');
const { mailSender } = require('../util/mailSender') ;


// generating link to the frontend and sending to email of user
exports.resetPasswordToken = async(req, res) => {
    try {
        // fetching email from req.body
        const {email} = req.body ;

        if(!email) {
            return res.status(400).json({
                success:false,
                message:'Please enter your email correctly'
            })
        }

        // check if user is registered
        const isUSerExists = await User.findOne({email:email}) ;
        if(!isUSerExists) {
            return res.status(404).json({
                success:false,
                message:"User's email is not registered"
            })
        }

        // user is registered, so generate token
        // const token = crypto.randomUUID() ;
        const token = crypto.randomBytes(20).toString("hex"); 
        const userDetails = await User.findOneAndUpdate(
                                            {email:email},
                                            {
                                                token:token,
                                                resetPasswordExpiry: Date.now() + 300000
                                            },
                                            {new:true});
        
        // create url
        let url = `http://localhost:3000/update-password/${token}` ;
        
        // sending mail with above url
        await mailSender(email, 
                        "Password Reset Link",
                        `Your Link for resetting password is ${url}. Please click this url to reset your password.`) ;
        
        return res.status(200).json({
            success:true,
            message:"Email sent successfully, please check it & update password"
        })

    } catch (error) {
        console.log("Error while sending reset password mail: ", error) ;
        return res.status(500).json({
            success:false,
            message:"Error while sending reset password mail",
            error:error.message
        })
    }
   
}

// verifying new pass and confirm pass 
exports.resetPassword = async(req, res) => {
    try {
        // fetching data from req.body
        const {token, newPassword, confirmPassword} = req.body ;
       
        if(!newPassword || !confirmPassword || !token) {
            return res.status(400).json({
                success:false,
                message:'Please fill all the details'
            })
        }

        // check both passwords matches
        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:'Make sure both passwords are equal'
            })
        }
        
        // check if token exists in User collection or not also check token validity
        const userDetails = await User.findOne({token:token}) ;
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:"Token does not exists"
            })
        }
        console.log("Printing userDetails found by token: ", userDetails) ;
        // is token expired
        if(userDetails.resetPasswordExpiry < Date.now()) {
            return res.status(401).json({
                success:false,
                message:"Token is Expired, Please Regenerate Your Token"
            })
        }
        
        // here token is valid so hash password to store it in db
        const encryptedPassword = await bcrypt.hash(newPassword, 10) ;
        
        // updating password in db with new password
        const updatedDetails = await User.findOneAndUpdate(
                                        {token: token},
                                        {
                                            password:encryptedPassword
                                        },
                                        {new:true});
        
        //sending mail of password updation
        await mailSender(userDetails.email, 
            "Password Updation Mail",
            passwordUpdated(
                userDetails.email,
                `${userDetails.firstName} ${userDetails.lastName}`
            )) ;
            
            
        return res.status(200).json({
            success:true,
            message:"Password updated Successfully",
            updatedDetails
        })
    } catch (error) {
        console.log("Error while reseting password: ", error) ;
        return res.status(500).json({
            success:false,
            message:"Error while reseting password",
            error:error.message
        })
    }
}

//ChangeOldPassword 
exports.changePassword = async(req, res) => {
    try {
        // fetch data from req.body
        const { oldPassword, newPassword, confirmPassword} = req.body ;

        // validation 
        if(!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        // check newPassword and confirmPassword
        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:'New Password and Confirm Password fields do not match'
            })
        }

        // find userDetails first
        const id = req.user.id ;
        const userDetails = await User.findById(id) ;

        // matching oldPassword with password that is already saved in user db model
        let encryptedPassword ;
        if (await bcrypt.compare(oldPassword, userDetails.password)) {
            // if password matches then hash the confirmPassword
            encryptedPassword = await bcrypt.hash(confirmPassword, 10) ;
        } else {
            return res.status(400).json({
                success:false,
                message:'Old password do not match'
            })
        }

        // make entry in db for password
        const updatedUserDetails = await User.findByIdAndUpdate(
            id,
            {
                password: encryptedPassword
            },
            {new:true}
        )

        // send mail after successfully changing old pass to new pass
        const response = await mailSender(
            userDetails.email,
            "Password Update Confirmation mail from StudyNotion",
            passwordUpdated(userDetails.email, `${userDetails.firstName} ${userDetails.lastName}`)
        );

        return res.status(200).json({
            success:true,
            message:'Password changed successfully'
        });
    } catch (error) {
        console.log("Error while updating password: ", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while updating password',
            error:error.message
        })
    }
}