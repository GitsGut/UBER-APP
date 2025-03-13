import React , { useState } from 'react'
import {Link} from 'react-router-dom'

const captainLogin = () =>  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({})
  const  submitHandler = (e)=>
  {
    e.preventDefault();
   setCaptainData({
     email,
     password
   })
   console.log(captainData);
   setEmail("");
   setPassword("");
  }
  return (
    <div className=" p-7 flex flex-col justify-between h-screen ">
      <div>
      <form action="" onSubmit={(e)=>{submitHandler(e)}}> 
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