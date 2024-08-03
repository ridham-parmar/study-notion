const mongoose = require('mongoose') ;
const {mailSender} = require('../util/mailSender') ;
const {otpTemplate} = require('../mail/templates/emailVerificationTemplate') ;

const otpSchema = new mongoose.Schema(
    {
        email: {
            type:String,
            required:true
        },
        otp: {
            type:String,
            required:true
        },
        otpExpiry: {
            type: Date,
            default: Date.now(),
            expires: '2m'   //otp expires after 2 min when the entry of otp in db
        }
    }
)

// define function to send mail

async function sendVerificationMail(email, otp) {
    try {
        const response = await mailSender(
            email, 
            "Verification mail from StudyNotion || By Ridham", 
            otpTemplate(otp)) ;
        // console.log("Mail sent successfully : ", response) ;
    } catch (error) {
        console.log("Error while sending mail : ", error) ;
        throw error ;
    }
}



// used pre hook to send mail before document has been saved
otpSchema.pre("save", async function (next) {
    // console.log("here i am ") ;  
    
    // if(this.isNew) {
        await sendVerificationMail(this.email, this.otp) ;
    // }
    next() ;
})

module.exports = mongoose.model("OTP", otpSchema) ;