const SubSection = require('../models/SubSection') ;
const Section = require('../models/Section') ;
const { uploadFileToCloudinary } = require('../util/fileUploader');
require('dotenv').config() ;

// createSection
exports.createSubSection = async(req, res) => {
    try {
        //  fetch data
        const {subSectionName, subSectionDescription, timeDuration, sectionId} = req.body ;

        // fetching videoFile
        const video = req.files.video ;
 
        // validation
        if(!subSectionName || !subSectionDescription || !timeDuration || !sectionId || !video) {
            return res.status(400).json({
                success:false,
                message:'All details are required'
            })
        }
        console.log("Printing video: ",video) ;
        // upload video to cloudinary to get its url
        let uploadVideo ;
        try {
            uploadVideo = await uploadFileToCloudinary(video, process.env.FOLDER_NAME) ;
            // console.log("Printing uploadVideo detaisl: ", uploadVideo) ;
        } catch (error) {
            console.log("Error while uploading video to cloudinary: ", error) ;
            return res.status(400).json({
                success:false,
                message:"Error while uploading video to cloudinary",
                error:error.message
            })
        }

        // creating sub-section
        const createdSubSection = await SubSection.create({
            subSectionName,
            subSectionDescription,
            timeDuration,
            videoUrl:uploadVideo.secure_url
        })

        // adding subSection ki id in subsection array of Section model
        const updatedSectionDetails = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {$push: {subsection: createdSubSection._id}},
            {new:true}
        ).populate("subsection") ;

        return res.status(200).json({
            success:true,
            message:'SubSection created Successfully',
            updatedSectionDetails
        })

    } catch (error) {
        console.log('Error while creating SubSection: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while creating SubSection',
            error:error.message
        })
    }
}

// updateSubSection
exports.updateSubSection = async(req, res) => {
    try {
        // fetching data 
        const {subSectionName, subSectionDescription, timeDuration, subSectionId} = req.body ;

        // fetch video file 
        const videoFile = req.files.videoFile ;

        // validation
        if(!subSectionName || !subSectionDescription || !timeDuration || !subSectionId) {
            return res.status(400).json({
                success:false,
                message:'All details are required'
            })
        }

        // upload videoFile to cloudinary
        let uploadVideo ;
        try {
            uploadVideo = await uploadFileToCloudinary(videoFile, process.env.FOLDER_NAME) ;
        } catch (error) {
            console.log("Error while uploading video to cloudinary: ", error) ;
            return res.status(401).json({
                success:false,
                message:"Error while uploading video to cloudinary"
            })
        }
        
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            {_id:subSectionId},
            {
                subSectionName,
                subSectionDescription,
                timeDuration,
                videoUrl:uploadVideo.secure_url
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:'SubSection updated successfully',
            updatedSubSection
        })

    } catch (error) {
        console.log('Error while updating SubSection: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while updating SubSection',
            error:error.message
        })
    }
}

// deleteSubSection
exports.deleteSubSection = async(req, res) => {
    try {
        // assume wwe are getting subsection id from params
        // const {subSectionId} = req.params ;
        const {subSectionId, sectionId} = req.body ;

        // validation
        if(!subSectionId) {
            return res.status(400).json({
                success:false,
                message:'All details are required'
            })
        }

        // delete subsection
        const deletedSection = await SubSection.findByIdAndDelete({_id:subSectionId}) ;
        
        //TODO[Testing]: do we need to delete the entry from the section schema ??
        await Section.findByIdAndUpdate({_id:sectionId},
                                        {$pull: {subsection: subSectionId}},
                                        {new:true}) ;

        return res.status(200).json({
            success:true,
            message:'SubSection deleted successfully',
        })
    } catch (error) {
        console.log('Error while deleting SubSection: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while deleting SubSection',
            error:error.message
        })
    }
}