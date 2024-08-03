const mongoose = require('mongoose') ;

const profileSchema = new mongoose.Schema(
    {
        profession: {
            type:String,
            trim:true
        },
        gender: {
            type:String,
            trim:true
        },
        about: {
            type:String,
            trim:true
        },
        dateOfBirth: {
            type:String,
            trim:true
        },
        contactNumber: {
            type: Number,
            trim: true,
        },
    }
)

module.exports = mongoose.model("Profile", profileSchema) ;