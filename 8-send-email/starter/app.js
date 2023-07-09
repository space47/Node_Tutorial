require('dotenv').config();
require('express-async-errors');

const express = require('express')
const app = express()

const sendEmail = require('./controlller/sendEmail')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

// routes
app.get('/', (req,res) => {
    res.send('<h1>Email Project</h1><a href="/send">Send Email</a>')
})

app.get('/send',sendEmail)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        app.listen(port, console.log(`Server is listening at port ${port}...`))
    } catch (error) {
        console.log(error)   
    }
}

start();