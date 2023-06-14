const http = require('http')

const server = http.createServer((req,res) =>{
    if(req.url==='/'){
        res.write('Welcome to our home page')
        res.end()
    }
    if(req.url==='/about'){
        res.end('Find something historic about us here')
    }else{
        res.end(`
            <h1>Oops!</h1>
            <a href="/">back Home</a>
        `);
    }
})

server.listen(5000);