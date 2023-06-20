require('dotenv').config()
// async errors
require('express-async-errors')

const express = require('express')

const app = express()
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-Handler')


// middlewares
app.use(express.json())

const port = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.send('<h1> Store API </h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products',productsRouter)
// products route

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        //connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=> console.log(`Server is listening at port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()