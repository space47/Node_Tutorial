const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')
const authenticationMiddleware  = async (req,res,next) => {
    // console.log("Line 4="+req.authorization)
    const authHeader = req.headers.authorization;
    if(!authHeader){
        console.log('In the auth.js='+authHeader.token)
        throw new UnauthenticatedError('No token provided ')
    }
    // it will take the token from the header
    const token = authHeader.split(' ')[1]
    // console.log(`Token ${token}`)

    try {
        // verify the token using the secret key
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id,username}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}

module.exports  = authenticationMiddleware