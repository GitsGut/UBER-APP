import React, { useState,useContext } from "react";
import {Link,useNavigate} from 'react-router-dom'
import {userDataContext} from '../context/userContext'
import axios from 'axios'
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({})
  const navigate = useNavigate();
  const {setuser} = useContext(userDataContext);
  const  submitHandler = async (e)=>
  {
    try{e.preventDefault();
 const user = {
  email,
  password
 }
 const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const response = await axios.post(`${BASE_URL}/users/login`,user);
if(response.status === 200)
{
  const data = response.data;
  setuser(data.user);
  localStorage.setItem('token', data.token);
  navigate("/Home");

}
 
   setEmail("");
   setPassword("");}
   catch(error)
   {
      console.error("Login Error:", error);
   }
  }
  return (
    <div className=" p-7 flex flex-col justify-between h-screen ">
      <div>
      <form action="" onSubmit={async (e)=>{submitHandler(e)}}> 
      <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <h3 className=" text-lg font-medium mb-1">Whats Your Email</h3>

        <input type="email" 
         value={email} 
         onChange={(e) =>  setEmail(e.target.value)}
        className="bg-[#eeeeee] rounded px-4 py-2 border w-full  text-lg placeholder:text-base mb-4 "
         required placeholder="abc@mail.com" />

        <h3 className="text-lg font-medium mb-1" >Enter Password</h3>
        <input type="password" value={password} onChange={(e)=>
          {
            setPassword(e.target.value);
          }
        }
        className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base "
        required placeholder="Password Here" />

        <button type="submit" 
        className="bg-black text-white  font-semibold rounded px-4 py-2  w-full text-lg mt-5 mb-1 ">
          Login
          </button>
      <div className="mt-5">
      <p className="text-center"> New Here ? <Link to="/Signup" className="text-blue-600">Create New Account </Link> </p>
      </div>
      </form>
      </div>
      <div>
        <Link  to={"/captain-login"} 
        className="bg-[#e88c4d] flex items-center justify-center  text-white  font-semibold rounded px-4 py-2  w-full text-lg mb-2 " >
          Sign in as Captain</Link>
     
    </div>
    </div>
   
  );
};

export default UserLogin;
