const express = require('express')
const path = require('path')
const app = express()

// setup static and middleware
// don't need to create path for  each file like we were doing in http node
app.use(express.static('./public'))

// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'./navbar-app/index.html'))
//     // add index.html to public folder, it will render through static
// })
app.all('*',(req,res)=>{
    res.status(404).send('resource not found')
})
app.listen(5000,()=>{
    console.log('server is listening on port 5000...')
})