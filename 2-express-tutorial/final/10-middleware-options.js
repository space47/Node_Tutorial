// use of thirdparty middleware morgan


const express = require('express')
const app = express()
const morgan = require('morgan')
const logger = require('../logger')
const authorize = require('../authorize')



// req => middleware => res
// 1. use vs route
// 2. options - our own / express middleware / third party

// app.use([logger,authorize])

// for all the routes with /ap
// app.use('/api',[logger])

// need a middleware inside app.use()
// will show the statuc content inside public folder
// app.use(express.static('./public'))

// morgan is pre builded middleware provided by express
app.use(morgan('tiny'))

app.get('/',(req,res)=>{
    res.send('Home')
}) 
app.get('/about', (req,res)=>{
    res.send('About')
})
app.get('/api/products',(req,res)=>{
    res.send('Products')
})

// multiple middlewares can be added
app.get('/api/items',[logger,authorize],(req,res)=>{
    // console.log(req.user)
    res.status(200).send('Items')
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})