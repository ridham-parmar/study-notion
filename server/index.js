const express = require('express') ;
const app = express() ;

require('dotenv').config() ;
const PORT = process.env.PORT || 4000

// initiating server
app.listen(PORT, () => {
    console.log(`App is up and ready to run on port ${PORT}`) ;
})

// middlewares
app.use(express.json()) ;
// cookie parser middleware
const cookieParser = require('cookie-parser') ;
app.use(cookieParser()) ;
// middleware that handles file upload to server
const fileUpload = require('express-fileupload') ;
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp'
})) ;
// middleware for cross-origin resource sharing
const cors = require('cors') ;
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

// importing all routes
const courseRoutes = require('./routes/Course') ;
const paymentRoutes = require('./routes/Payment') ;
const profileRoutes = require('./routes/Profile') ;
const userRoutes = require('./routes/User') ;

// routes mounting
app.use('/api/v1/course', courseRoutes) ;
app.use('/api/v1/payment', paymentRoutes) ;
app.use('/api/v1/profile', profileRoutes) ;
app.use('/api/v1/auth', userRoutes) ;

// dbConnection
const { dbConnect } = require('./config/database') ;
dbConnect() ;

// Cloudinary connection
const { cloudinaryConnect } = require('./config/cloudinary') ;
cloudinaryConnect() ;

// default route
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Study Notion - Backend</h1>`) ;
})
 


