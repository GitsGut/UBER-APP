import React, { useContext } from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/home'
import UserLogin from './pages/userLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/captainLogin'
import CaptainSignup from './pages/CaptainSignup'
import {userDataContext} from '../context/userContext'



const App = () => {
  return (
   <div>
    <Routes>
    <Route path='/' element={<Home />}/>
      <Route path='/login' element={<UserLogin />}/>
      <Route path='/Signup' element={<UserSignup />}/>
      <Route path='/captain-Signup' element={<CaptainSignup />}/>
      <Route path='/captain-login' element={<CaptainLogin />}/>

    </Routes>
   </div>
  )
}

export default App