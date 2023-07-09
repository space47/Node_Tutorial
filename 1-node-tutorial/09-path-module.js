const path = require('path')

console.log(path.sep)
// \

const filePath = path.join('/content/', 'subfolder', 'test.txt')
console.log(filePath)
// \content\subfolder\test.txt

const base = path.basename(filePath)
console.log(base)
// test.txt

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute)
// C:\Users\varni\OneDrive\Desktop\Node Tutorial\1-node-tutorial\content\subfolder\test.txt


