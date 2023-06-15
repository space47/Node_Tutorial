console.log('express-tutorial')
const http = require('http')


//this below call back will be invoked every time user gets to our server
const server = http.createServer((req,res)=>{
    const url = req.url;

    if(url==='/'){
        res.writeHead(200,{'content-type': 'text/html'})
        res.write('<h1>Home Page</h1>')
        res.end()
    }
    //about page
    else if(url==='/about'){
        res.writeHead(200,{'content-type':'text/html'})
        res.write('<h1>about Page</h1>')
        res.end()
    }
    //404
    else{
        res.writeHead(404,{'content-type':'text/html'})
        res.write('<h1>page not found</h1>')
        res.end()
    }
})

server.listen(5000)