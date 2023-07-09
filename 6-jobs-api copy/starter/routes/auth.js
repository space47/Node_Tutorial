const express = require('express')

const router = express.Router()
const authenticateMiddleWare = require('../middleware/authenticated')
const {login, register,updateUser} = require('../controllers/auth')
const testUser = require('../middleware/textUser')

const rateLimiter = require('express-rate-limit')

const apiLimiter  = rateLimiter({
    windowMs: 15*60*1000,
    max: 10,
    message:{
        msg: 'Too many requests from this IP, please try again after 15 minutes',
    },
})

router.post('/register',apiLimiter,register)
router.post('/login',apiLimiter,login)
// throw an error if user is test user, check it by using testUser middleware
router.patch('/updateUser',authenticateMiddleWare,testUser,updateUser)
     
module.exports = router
