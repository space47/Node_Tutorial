const EventEmitter = require('events')
const customEmitter = new EventEmitter()

customEmitter.on('response', (name,id) => {
    console.log(`data recieved user ${name} ${id}`)
})
customEmitter.on('response', () => {
    console.log(`some other logic`)
})
console.log('call1')
customEmitter.emit('response','john',34)
// call1
// data recieved user john 34
// some other logic

console.log('call2')
customEmitter.emit('response')
// call2
// data recieved user undefined undefined
// some other logic