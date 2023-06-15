// to be used when promise is attached to fs
const { readFile, writeFile } = require('fs').promises
// to be used when getText is used
// const { readFile, writeFile } = require('fs')

// use when making read and writeFile promisify
// const util = require('util')
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)



const getText = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
getText('./content/first.txt')
    .then((result) => console.log(result))
    .catch((err) => console.log(err))
const start = async () => {
    try {
        // // by using only await and getText
        // //call getText function
        // const first = await getText('./content/first.txt')
        // const second = await getText('./content/second.txt')

        // by using util to make read and writeFile promisify
        // const first = await readFilePromise('./content/first.txt','utf8')
        // const second = await readFilePromise('./content/second.txt','utf8')
        // await writeFilePromise('./content/result-await.txt',`This is awesome: ${first} ${second}`,{flag:'a'})

        // by making read and writeFile promiseful on first hand
        const first = await readFile('./content/first.txt','utf8')
        const second = await readFile('./content/second.txt','utf8')
        await writeFile(
            './content/result-await.txt',
            `This is awesome: ${first} ${second}`,
            {flag:'a'}
        )
        console.log(first,second)
    } catch (error) {
        console.log(error)
    }
}
start()


// const {readFile, writeFile, read} = require('fs')

// console.log('start')
// writeFile('./content/second.txt', `This is the second file`,(err,result) => {
//     if(err){
//         console.log(err)
//         return
//     }
// })

// readFile('./content/first.txt', 'utf8', (err,result) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     const first = result
//     readFile('./content/second.txt', 'utf8', (err,result) => {
//         if(err){
//             console.log(err)
//             return
//         }
//         const second = result
//         writeFile('./content/result-async.txt',`Here is the result: ${first}, ${second}`, (err,result) =>{
//             if(err){
//                 console.log(err)
//                 return
//             }
//         })
//     })
// })
