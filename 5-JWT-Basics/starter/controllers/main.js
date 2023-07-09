// check username, password in post(login) request
// if exist create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dashboard

const  jwt = require('jsonwebtoken')
const { BadRequestError } = require("../errors");

// this one has only login
const login = async (req,res) => {
    const {username,password} = req.body

    // mongoose validation
    // Joi
    // check in the controller
    // console.log(username,password)

    if(!username || !password){
        // console.log('came in')
        throw new BadRequestError('Please provide Email and Password')
    }

    // just for demo, normally provided by DB!!!
    const id = new Date().getDate()

    // try to keep payload small ,better experience for user
    // just for demo, in production use long, complex and ungussable string value
    // it will create a token during authentication
    const token = jwt.sign({id,username}, process.env.JWT_SECRET,{expiresIn:'30d'})
    // will verify jwt token in authenticatedMiddleware
    res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req,res) => {
    console.log('In the dashboard',req.user)
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({
        msg: `Hello, ${req.user.username}`, 
        secret: `Here is your authorized Data, you lucky number is ${luckyNumber}`})
}

module.exports = {
    login, dashboard
}