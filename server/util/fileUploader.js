const cloudinary = require('cloudinary').v2 ;

exports.uploadFileToCloudinary = async(file, folder, height, quality) => {
    // console.log("Printing file : ", file) 
    // console.log("Printing folder : ", folder) 
    const options = {folder} ;

    if(height) {
        options.height = height ;
    }
    if(quality) {
        options.quality = quality ;
    }
    options.resource_type = 'auto' ;

    return await cloudinary.uploader.upload(file.tempFilePath, options) ;
}