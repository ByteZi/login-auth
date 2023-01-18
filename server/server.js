const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const cors = require('cors')

const salt = 10

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost/clientDB')
    .then(() => console.log('established connection to DB'))
    .catch(err => console.log(err))


app.use(cors(), express.json(), express.urlencoded({extended:true}))

const user = mongoose.Schema({
    username :{
        type:String,
        required :[true, 'Username required'],
        minlength : [5, 'Min length of 5']
    },

    password : {
        type : String,
        required : [true, 'Password required'],
        minlength : [5, 'Password length 5']
    }
})

const User = mongoose.model('Users' , user)


app.post('/post', async(req, res) =>{

    const obj = {
        username : req.body.username,
        password : await bcrypt.hash(req.body.password, salt) 
    }

    console.log(obj)

    User.create(obj)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json(err))

    // const test = await bcrypt.hash(req.body.password, salt)
    // console.log(await bcrypt.compare( req.body.password, test))
})



app.listen(3001, console.log('Listening'))
