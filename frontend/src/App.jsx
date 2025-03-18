import React, { useContext } from 'react'
import {Route, Routes} from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/captainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/userLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'


const App = () => {
  return (
   <div>
    <Routes>
    <Route path='/' element={<Start />}/>
      <Route path='/login' element={<UserLogin />}/>
      <Route path='/Signup' element={<UserSignup />}/>
      <Route path='/captain-Signup' element={<CaptainSignup />}/>
      <Route path='/captain-login' element={<CaptainLogin />}/>
      <Route path='/home' element={
        <UserProtectedWrapper> 
          <Home />
        </UserProtectedWrapper>}
        />
        <Route path='/user/logout' element = {
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
              }   />
                <Route path='/captain-home' element={
        <CaptainProtectedWrapper> 
          <CaptainHome />
        </CaptainProtectedWrapper>}

        />
        <Route path = 'captain/logout' element = {
          <CaptainProtectedWrapper>
            <CaptainLogout/>
          </CaptainProtectedWrapper>
        } />
    </Routes>
   </div>
  ) 
}

export default App