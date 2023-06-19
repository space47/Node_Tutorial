const express = require('express')

//instead of setting app we setup router
//we explicitly get router from express
const router = express.Router();
const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people')

// router.get('/api/people',(req,res)=>{
// router.get('/', getPeople)

// // router.post('/api/people',(req,res)=>{
// router.post('/', createPerson)


// // router.post('/api/postman/people',(req,res)=>{
// router.post('/postman', createPersonPostman)

// // router.put('/api/people/:id',(req,res)=>{
// router.put('/:id', updatePerson)

// // router.delete('/api/people/:id', (req,res)=>{
// router.delete('/:id', deletePerson)


router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletePerson)
module.exports = router