const Section = require('../models/Section') ;
const Course = require('../models/Course') ;

// createSection
exports.createSection = async(req, res) => {
    try {
        // fetching data from req.body
        const {sectionName, courseId} = req.body ;

        // validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:'All details are required'
            })
        }

        // create section
        const createdSection = await Section.create({sectionName}) ;

        // creating entry of created section in courseContent array of Course model
        const updatedCourse = await Course.findByIdAndUpdate(
                                        {_id: courseId}, 
                                        {$push: {courseContent: createdSection._id}},
                                        {new:true})
                                        .populate({
                                            path:"courseContent",
                                            populate: {
                                                path: "subsection"
                                            }
                                        }).exec() ;

        // console.log("")

        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            createdSection
        })
    } catch (error) {
        console.log('Error while creating Section: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while creating Section',
            error:error.message
        })
    }
}

// updateSection
exports.updateSection = async(req, res) => {
    try {
        // fetch data from req. body
        const {sectionName, sectionId} = req.body ;

        // validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:'All details are required'
            })
        }
        
        // update section
        const updatedSectionDetails = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {sectionName},
            {new:true}
        )
        
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedSectionDetails
        })
    } catch (error) {
        console.log('Error while updating Section: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while updating Section',
            error:error.message
        })
    }
}

// deleteSection
exports.deleteSection = async(req, res) => {
    try {
        // fetching data
         //get ID - assuming that we are sending ID in params
        // const {sectionId} = req.params ;
        const {sectionId, courseId} = req.body ;
        
        // validation
        if(!sectionId) {
            return res.status(400).json({
                success:false,
                message:'All details are required'
            })
        }

        // delete section
        const deletedSection = await Section.findByIdAndDelete({_id:sectionId}) ;
        
        //TODO[Testing]: do we need to delete the entry from the course schema ??
        await Course.findByIdAndUpdate({_id:courseId},
                                        {$pull: {courseContent: sectionId}},
                                        {new:true}) ;
        
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully',
        })
    } catch (error) {
        console.log('Error while deleting Section: ', error) ;
        return res.status(500).json({
            success:false,
            message:'Error while deleting Section',
            error:error.message
        })
    }
}