import './App.css';

import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'

import {
  BrowserRouter,
  Route,
  Routes,
  Link,

} from 'react-router-dom'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={
            <div id="container">
              <h1>Welcome</h1>

              <Link to="/login">login</Link>
              <Link to="/signup">signup</Link>

            </div>
          } />

        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
