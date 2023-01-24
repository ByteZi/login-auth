import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = (props) => {


    const [usernameLogin, setLoginUsername] = useState('')
    const [passwordLogin, setLoginPassword] = useState('')
    const [err, setErr] = useState([])
    const history = useNavigate()

    const onLogin = (e) => {
        e.preventDefault()

        const obj = {
            username: usernameLogin,
            password: passwordLogin
        }

        axios.post('http://localhost:3001/login', obj)
            .then((token) => {
                console.log(token)
                history('/')
            })
            .catch(err => {
                const errResp = err.response.data
                const errArr = []
                for (const key of Object.keys(errResp)) {
                    errArr.push(errResp[key])
                }
                setLoginUsername('')
                setLoginPassword('')
                setErr(errArr)
            })
    }
    return (
        <>

            <form onSubmit={onLogin} id="container">
                <h1>LogIn</h1>
                <input placeholder='Username' onChange={(e) => setLoginUsername(e.target.value)} value={usernameLogin}></input>
                <input placeholder='Password' onChange={(e) => setLoginPassword(e.target.value)} value={passwordLogin}></input>
                <button>Submit</button>
            </form>
            {
                err ?
                    err.map((i, k) => (
                        <h4 style={{ color: 'red' }} key={k}>{i}</h4>
                    ))
                    : null
            }
        </>
    )
}

export default Login