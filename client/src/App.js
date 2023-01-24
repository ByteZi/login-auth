import './App.css';
import { useState } from 'react'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
