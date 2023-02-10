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
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/" element={
            <div id="container">
              <h1>Welcome</h1>

              <Link to="/login">login</Link>
              <Link to="/signup">signup</Link>

            </div>
          } /> */}

        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
