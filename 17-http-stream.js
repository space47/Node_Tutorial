var http = require('http')
var fs = require('fs')

// http
//     .createServer((req, res) => {
//         const text = fs.readFileSync('./content/bigfile.txt', 'utf8')
//         res.end(text)
//     }).listen(5000, () => {
//         console.log('server starting on port 5000')
//     })


http
    .createServer((req, res) => {
        const fileStream = fs.createReadStream('./content/bigfile.txt', 'utf8')
        fileStream.on('open',()=>{
            fileStream.pipe(res)
        })
        fileStream.on('error',(err)=>{
            res.end(err)
        })
    }).listen(5001, () => {
        console.log('server starting on port 5000')
    })


