const Category = require('../models/Category') ;


exports.createCategory = async(req, res) => {
    try {
        // fetching data from body
        const {name, description} = req.body ;

        // check validation 
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:'Please fill all the details'
            })
        }
        
        // created tag entry in db
        const categoryDetail = await Category.create({name, description}) ;

        return res.status(200).json({
            success:true,
            message:'Category created successfully',
            categoryDetail
        })
    } catch (error) {
        console.log("Error while tag creation: ", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while tag creation',
            error:error.message
        })
    }
}

// fetching all category from db
exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find({}, {name:true, description:true}) ;

        return res.status(200).json({
            success:true,
            message:'Category fetched successfully',
            categories
        })
    } catch (error) {
        console.log("Error while fetching tag: ", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while fetching tag',
            error:error.message
        })
    }
}

// CategoryPageDetails
exports.getCategoryPageDetail = async(req, res) => {
    try {
        // fetching category id
        const {categoryId} = req.body ;
        // check validation 
        if(!categoryId) {
            return res.status(400).json({
                success:false,
                message:'Invalid categoryId'
            })
        }

        // get courses for above categoryId
        const selectedCategory = await Category.findById({_id:categoryId})
                                        .populate("courseId")
                                        .exec() ;
            
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message: `Could not found course details for ${categoryId} category`
            })
        }

        // get courses for different categories
        const differentCategories = await Category.findById({_id: {$ne: categoryId}})
                                                    .populate("courseId")
                                                    .exec() ;

        //get top 10 selling courses hw

        return res.status(200).json({
            success:true,
            message:'Fetched courses by category id',
            data: {
                selectedCategory,
                differentCategories
            }
        })
    } catch (error) {
        console.log("Error while fetching courses by category id: ", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while fetching courses by category id',
            error:error.message
        })
    }
}

