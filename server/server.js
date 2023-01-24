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
        minlength : [5, 'Min length of 5'],
        unique : [true, 'Username already taken']
    },

    password : {
        type : String,
        required : [true, 'Password required'],
        minlength : [5, 'Password length 5']
    },
    todos : [{type : mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
})

user.pre('save', async function(next){

    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('Users' , user)


app.post('/post', (req, res) =>{
   
    User.create(req.body)
        .then(obj => {
            res.json(obj)
            console.log('userCreated')
        })
        .catch(err => res.status(400).json(err))
})

app.post('/login', (req, res) => {
    User.findOne({username: req.body.username})
        .then(async(data) => {
            const comp = await bcrypt.compare(req.body.password, data.password) 
            if (comp){
                res.json({cookie:"send cookie"})
            }else throw 'Something went wrong with the credentials'
        })
        .catch(err => res.status(500).json({
            errors : err
        }))
})



app.listen(3001, console.log('Listening'))
