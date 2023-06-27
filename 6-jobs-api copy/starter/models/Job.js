const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        requrierd: [true, 'Please provide user']
    },
    jogType: {
        type: String,
        enum: ['full-time','parttime','remote','internship'],
        default: 'full-time'
    },
    jogLocation: {
        type: String,
        required: true,
        default: 'my-city'
    },
    

},{timestamps: true})

module.exports = mongoose.model('Jobs', JobSchema)