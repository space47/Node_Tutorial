const express = require('express')
const app = express()
const people = require('./routes/people')
const auth = require('./routes/auth')

// static assets
app.use(express.static('./method-public'))

// for post request with normal  / loginn
// parse form data
app.use(express.urlencoded({extended: false}))
// for post request with javascirpt
// parse json
app.use(express.json())

app.use('/api/people',people)

app.use('/login',auth)

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})