require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet')
const xss = require('xss-clean')
const path = require('path')

const express = require('express')
const app = express()

// connectDB
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const authentication = require('./middleware/authenticated')

// error handler import
const notFoundMiddleware = require('./middleware/not-found')
const erroHandlerMiddlerware = require('./middleware/error-handler')

app.use(express.static(path.resolve(__dirname,'./client/build')))
app.use(express.json())
app.use(helmet())
app.use(xss())

// serve index.html
// app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'./client/build','index.html'))
// }) 

// routes 
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authentication,jobsRouter)

//using error handler middlewares

app.use(notFoundMiddleware)
app.use(erroHandlerMiddlerware)


const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)        
    }
}

start()