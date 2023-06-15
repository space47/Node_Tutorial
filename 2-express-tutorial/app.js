const express = require('express')
const {products,people} = require('./data')
const app = express()


app.get('/', (req,res) => {
     res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
})

app.get('/api/products/1',(req,res)=>{
    const singleProduct = products.find((product)=>product.id===1)
    res.json(singleProduct)
})

// for all id
app.get('/api/products/:productID',(req,res)=>{
    console.log(req.params)
    const {productID} = req.params
    const singleProduct = products.find((product)=>product.id===Number(productID))
    if(!singleProduct){
        return res.status(404).send('Product Does not exit')
    }
    // console.log(singleProduct)
    res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{
    console.log(req.params)
    res.send('Hello World')
})

app.all('*',(req,res)=>{
    res.status(404).send('Resource not found')
})
app.listen(5000, () => {
    console.log('Server is listening on port 5000...')
})

