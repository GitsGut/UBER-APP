import React , {createContext} from 'react'
import {useState} from 'react'

export const userDataContext = createContext();

const UserContext = ({children}) => {
 const [user, setuser] = useState({
  fullName:{
    firstName:"",
    lastName:""
  },
  email:"",
  password:""
 })
  return (
    <userDataContext.Provider value={{user, setuser}}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext