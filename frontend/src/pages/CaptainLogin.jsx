import axios from 'axios';
import { useContext } from 'react';
import React , { useState }  from 'react'
import {Link,Navigate,useNavigate} from 'react-router-dom'
import  { CaptainDataContext } from '../context/CaptainContext';

const captainLogin = () =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({})
  const {setCaptain} = useContext(CaptainDataContext); 
  const navigate = useNavigate();
  const  submitHandler =  async (e)=>
  {
    e.preventDefault();
 try {
  const user = {
    email ,
    password
  }
  const BASE_URL = `${import.meta.env.VITE_BASE_URL}` || 'http://localhost:3000';
  const response = await  axios.post(`${BASE_URL}/captains/login`,user);

  if(response.status === 200)
  {
   const data = response.data;
   setCaptain(data.captain);
   localStorage.setItem('token',data.token);
   navigate('/captain-home')
  }
 } catch (error) {
  console.log(error);
 }
   setEmail("");
   setPassword("");
  }
  return (
    <div className=" p-7 flex flex-col justify-between h-screen ">
      <div>
      <form action="" onSubmit={ async (e)=>{submitHandler(e)}}> 
      <img className='w-18 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

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

        <button 
        className="bg-black text-white  font-semibold rounded px-4 py-2  w-full text-lg mt-5 mb-1 ">
          Login
          </button>
      <div className="mt-5">
      <p className="text-center font-semibold"> Join a Fleet ? <Link to="/captain-signup" className="text-blue-600">Register as a Captain </Link> </p>
      </div>
      </form>
      </div>
      <div>
        <Link  to={"/login"} 
        className="bg-[#70A241] flex items-center justify-center  text-white  font-semibold rounded px-4 py-2  w-full text-lg mb-2 " >
          Sign in as User</Link>
     
    </div>
    </div>
   
  );
};


export default captainLogin