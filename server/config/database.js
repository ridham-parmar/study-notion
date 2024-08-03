const mongoose = require('mongoose') ;
require('dotenv').config() ;

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connection Successful'))
    .catch((error) => {
        console.log("DB Connection Successful") ;
        console.log(error) ;
        process.exit(1) ;
    })
}