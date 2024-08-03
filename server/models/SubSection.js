const mongoose = require('mongoose') ;

const subSectionSchema = new mongoose.Schema(
    {
        subSectionName: {
            type:String,
            required:true,
            trim:true
        },
        subSectionDescription: {
            type:String,
            required:true,
            trim:true
        },
        videoUrl: {
            type:String,
            required:true
        },
        timeDuration: {
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model("SubSection", subSectionSchema) ;