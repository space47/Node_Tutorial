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

router.route('/').post(testUser,createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').get(getJob).delete(testUser,deleteJob).patch(testUser,updateJob)

module.exports = router