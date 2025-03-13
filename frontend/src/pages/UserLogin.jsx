import React, { useState } from "react";
import {Link} from 'react-router-dom'
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({})
  const  submitHandler = (e)=>
  {
    e.preventDefault();
   setUserData({
     email,
     password
   })
   console.log(userData);
   setEmail("");
   setPassword("");
  }
  return (
    <div className=" p-7 flex flex-col justify-between h-screen ">
      <div>
      <form action="" onSubmit={(e)=>{submitHandler(e)}}> 
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

        <button 
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
