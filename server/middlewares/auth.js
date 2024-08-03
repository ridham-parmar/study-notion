require('dotenv').config() ;
const jwt = require('jsonwebtoken') ;

// auth
exports.auth = (req, res, next) => {
    try {
        // fetch token 
        const token = req.body.token ||
                        req.cookies.token ||
                        req.header("Authorization").replace("Bearer ", "") ;
        
        console.log("Printing token: ", token) ;

        // checking if token exists or not 
        if(!token) {
            return res.status(400).json({
                success:false,
                message:'Token not found, please login first'
            })
        }

        // decoding token 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET) ;
            req.user = decode ;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:'Error while decoding token'
            })
        }
        next() ;
    } catch (error) {
        console.log('error while authorization:', error) ;
        return res.status(500).json({
            success:false,
            message:'error while authorization',
            error:error.message
        })
    }
}

// isStudent
exports.isStudent = (req, res, next) => {
    try {
        if(req.user.accountType !== "Student") {
            return res.status(403).json({
                success:false,
                message:'You cant access private route Student'
            })
        }
        next();
    } catch (error) {
        console.log("Error while accessing private route student: ", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while accessing private route student',
            error:error.message
        })
    }
}

// isInstructor
exports.isInstructor = (req, res, next) => {
    try {
        if(req.user.accountType !== "Instructor") {
            return res.status(403).json({
                success:false,
                message:'You cant access private route Instructor'
            })
        }
        next();
    } catch (error) {
        console.log("Error while accessing private route instructor: ", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while accessing private route instructor',
            error:error.message
        })
    }
}

// isAdmin
exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.accountType !== "Admin") {
            return res.status(403).json({
                success:false,
                message:'You cant access private route Admin'
            })
        }
        next();
    } catch (error) {
        console.log("Error while accessing private route Admin: ", error) ;
        return res.status(500).json({
            success:false,
            message:'Error while accessing private route Admin',
            error:error.message
        })
    }
}