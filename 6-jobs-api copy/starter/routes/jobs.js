const express = require('express')
const router = express.Router()
const testUser = require('../middleware/textUser')

const {  
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    showStats
} = require('../controllers/jobs')

// if user is testUser don't allow for createJob and throw an error
router.route('/').post(testUser,createJob).get(getAllJobs)
router.route('/stats').get(showStats)
// if user is testUser don't allow for deleteJob, and updeateJob and throw an error
router.route('/:id').get(getJob).delete(testUser,deleteJob).patch(testUser,updateJob)

module.exports = router