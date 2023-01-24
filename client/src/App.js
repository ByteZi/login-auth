import './App.css';
import {useState} from 'react'
import axios from 'axios'



function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameLogin, setLoginUsername] = useState('')
  const [passwordLogin, setLoginPassword] = useState('')

  const [err, setErr] = useState([])

  const onSubmit = (e) =>{
    e.preventDefault()

    let user = {
      username,
      password 
    }

    axios.post('http://localhost:3001/post', user)
      .then(() => console.log('success'))
      .catch(err => {

        const errResp = err.response.data.errors
        const errArr =[]
        for (const key of Object.keys(errResp)){
          errArr.push(errResp[key].message)
        }
        setErr(errArr)

      })

      
  }

  const onLogin = (e) => {
    e.preventDefault()

    const obj = {
      username : usernameLogin,
      password: passwordLogin
    }

    axios.post('http://localhost:3001/login', obj)
      .then((data) => console.log('success'))
      .catch(err => {
        const errResp = err.response.data
        const errArr =[]
        for (const key of Object.keys(errResp)){
          errArr.push(errResp[key])
        }
        setErr(errArr)
      })
  }
  
  return (
    <div className="App">
      <form onSubmit={(e) => onSubmit(e)}>
        <input onChange={(e) => setUsername(e.target.value)} value={username}></input>
        <input onChange={(e) => setPassword(e.target.value)} value={password}></input>
        <button>Sign up</button>
      </form>

      <form onSubmit={(e) => onLogin(e)}>
        <input onChange={(e) => setLoginUsername(e.target.value)} value={usernameLogin}></input>
        <input onChange={(e) => setLoginPassword(e.target.value)} value={passwordLogin}></input>
        <button>log in</button>
      </form>
      {
        err ? 
        err.map( (i, k) => (
          <h4 style={{color:'red'}} key={k}>{i}</h4>
        ))
        : null
      }
    </div>
  );
}

export default App;
