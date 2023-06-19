console.log('express-tutorial')
const {readFileSync} = require('fs')

const http = require('http')

// get all files
const homePage = readFileSync('../navbar-app/index.html')
const homeStyle = readFileSync('../navbar-app/styles.css')
const homeLogo = readFileSync('../navbar-app/logo.svg')
const homeLogic = readFileSync('../navbar-app/browser-app.js')

//this below call back will be invoked every time user gets to our server
const server = http.createServer((req,res)=>{
    const url = req.url;

    if(url==='/'){
        res.writeHead(200,{'content-type': 'text/html'})
        // res.write('<h1>Home Page</h1>')
        res.write(homePage)
        res.end()
    }
    //about page
    else if(url==='/about'){
        res.writeHead(200,{'content-type':'text/html'})
        res.write('<h1>about Page</h1>')
        res.end()
    }
    //css styles file
    // it will send it to the browser
    else if(url==='/styles.css'){
        res.writeHead(200,{'content-type':'text/css'})
        res.write(homeStyle)
        res.end()
    }
    //image logo
    else if(url==='/logo.svg'){
        res.writeHead(200,{'content-type':'image/svg+xml'})
        res.write(homeLogo)
        res.end()
    }
    //logic script
    else if(url==='/browser-app.js'){
        res.writeHead(200,{'content-type':'text/javascript'})
        res.write(homeLogic)
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