import { useState } from 'react'
import axios from 'axios'
import './SignUp.css'

const SignUp = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState([])

    const onSubmit = (e) => {
        e.preventDefault()

        let user = {
            username,
            password
        }

        axios.post('http://localhost:3001/post', user)
            .then((token) => console.log(token))
            .catch(err => {


                if (err.response.data.keyValue) {
                    const errArr = [err.response.data.keyValue.username + ' Is already Taken']
                    setErr(errArr)

                } else {
                    const errResp = err.response.data.errors
                    const errArr = []
                    for (const key of Object.keys(errResp)) {
                        errArr.push(errResp[key].message)
                    }
                    setErr(errArr)
                }
            })


    }

    return (
        <div id="form-cont">
            <form onSubmit={(e) => onSubmit(e)}>
                <h1>Sign Up</h1>
                <input placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username}></input>
                <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}></input>
                <button>Submit</button>

            </form>
            {
                    err ?
                        err.map((i, k) => (
                            <h4 style={{ color: 'red' }} key={k}>{i}</h4>
                        ))
                        : <div></div>
                }
        </div>
    )
}

export default SignUp