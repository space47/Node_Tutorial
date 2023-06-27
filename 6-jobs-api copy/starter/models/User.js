const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { string } = require('joi')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlenght: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide Email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please Provide valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    lastName: {
        type: String,
        trim: true,
        maxlenght: 20, 
        default: 'lastname'
    },
    location: {
        type: String,
        trim: true,
        maxlenght: 20,
        default: 'my city'
    }

})

// below lines of code will hash the  password using mongoose middleware
UserSchema.pre('save',async function () {
    // will tell all the modified paths in the user details
    console.log(this.modifiedPaths())
    // below line will not allow to again hash the password after updating the user details
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt (10)
    this.password  = await bcrypt.hash(this.password,salt)
    
})


UserSchema.methods.createJWT = function() {
    return jwt.sign({userId:this._id, name: this.name}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

UserSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('Users',UserSchema)
