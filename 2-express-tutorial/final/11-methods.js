const express = require('express')
const app = express()
const {people} = require('../data')

// static assets
app.use(express.static('../method-public'))

// for post request with normal  / login
// parse form data
app.use(express.urlencoded({extended: false}))
// for post request with javascirpt
// parse json
app.use(express.json())


app.post('/login',(req,res)=>{
    const {name} = req.body
    console.log(name)
    if(name){
        return res.status(200).send(`Welcome ${name}`)
    }
    return res.status(401).send('Please Provide Credentials')
})

app.get('/api/people',(req,res)=>{
    res.status(200).json({sucess:true,data:people})
})

app.post('/api/people/',(req,res)=>{
    const {name} = req.body
    if(!name){
        return res  
            .status(400)
            .json({sucess: false, msg: 'Please provide name value'})
    }
    const newName = {sucess:true, person:name}
    people.push({id:people.length+1,name:name})
    return res.status(201).json(newName)
})


app.post('/api/people/postman',(req,res)=>{
    const {name}  = req.body
    if(!name){
        return res
            .status(400)
            .json({sucess:false, msg: 'please provide name value'})
    }
    const newUser = {id: people.length+1, name: name}
    people.push(newUser)
    return res
        .status(200)
        .send({sucess:false,data: [...people,newUser]})
})


app.put('/api/people/:id',(req,res)=>{
    const {id} = req.params;
    const {name} = req.body
    const person = people.find((person)=> person.id == Number(id))
    if(!person){
        return res  
            .status(404)
            .json({sucess: false, msg: `no person with id ${id}`})
    }
    const newPeople = people.map((person) => {
        if(person.id === Number(id)){
            person.name = name
        }
        return person
    })
    return res
        .status(200)
        .json({sucess: true, data: newPeople})
})

app.delete('/api/people/:id', (req,res)=>{
    const {id} = req.params
    const person = people.find((person)=> person.id == Number(id))
    if(!person){
        return res  
            .status(404)
            .json({sucess: false, msg: `no person with id ${id}`})
    }
    const newPeople = people.filter((person) => person.id!=Number(id))
    return res
        .status(200)
        .json({sucess: true, data: newPeople})
})

app.listen(5000,()=>{
    console.log('Server is listening on port 5000...')
})