// reading big file

const {createReadStream} = require('fs')

const stream = createReadStream('./content/bigfile.txt',{encoding:'utf-8'})
// const stream = createReadStream('./content/bigfile.txt',{highWaterMark:90000})

stream.on('data',(result) => {
    console.log(result)
})