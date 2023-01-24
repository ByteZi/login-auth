import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = (props) => {


    const [usernameLogin, setLoginUsername] = useState('')
    const [passwordLogin, setLoginPassword] = useState('')
    const [err, setErr] = useState([])

    const onLogin = (e) => {
        e.preventDefault()

        const obj = {
            username: usernameLogin,
            password: passwordLogin
        }

        axios.post('http://localhost:3001/login', obj)
            .then((token) => console.log(token))
            .catch(err => {
                const errResp = err.response.data
                const errArr = []
                for (const key of Object.keys(errResp)) {
                    errArr.push(errResp[key])
                }
                setErr(errArr)
            })
    }
    return (
        <div id="form-cont">

            <form onSubmit={(e) => onLogin(e)}>
                <h1>LogIn</h1>
                <input placeholder='Username' onChange={(e) => setLoginUsername(e.target.value)} value={usernameLogin}></input>
                <input placeholder='Password' onChange={(e) => setLoginPassword(e.target.value)} value={passwordLogin}></input>
                <button>Submit</button>
            </form>
            {
                    err ?
                        err.map((i, k) => (
                            <h4 style={{ color: 'red', fontSize:'50px' }} key={k}>{i}</h4>
                        ))
                        : null
                }
        </div>
    )
}

export default Login