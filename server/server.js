const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const salt = 10

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost/clientDB')
    .then(() => console.log('established connection to DB'))
    .catch(err => console.log(err))


app.use(cors(), express.json(), express.urlencoded({ extended: true }))

const user = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        minlength: [5, 'Min length of 5'],
        unique: [true, 'Username already taken']
    },

    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [5, 'Password length 5']
    },
    // todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
})

user.pre('save', async function (next) {

    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('Users', user)


app.post('/post', (req, res) => {
        User.create(req.body)
        .then(user => {
            const token = jwt.sign({user}, 'secret')
            res.status(200).json(token)
        })
        .catch(err => res.status(400).json(err))
})

app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username })
        .then(async (user) => {
            const comp = await bcrypt.compare(req.body.password, user.password)
            if (comp) {
                const token = jwt.sign({id: user.id , username : user.username , password : user.password}, 'secret-key')
                console.log(token)
                res.json({userToken : token})
            }
        })
        .catch(() => res.status(404).json({ err: 'Credentials Error' }))
})



app.listen(3001, console.log('Listening'))
