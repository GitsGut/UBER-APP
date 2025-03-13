import React,{useState} from 'react'
import {Link} from 'react-router-dom'
const captainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [userData, setUserData] = useState({})
  const  submitHandler = (e)=>
  {
    e.preventDefault();
   setUserData({
    fullName:
    {
      firstName:fname,
      lastName :lname
    },
    email,
    password
   })
   console.log(userData);
   setEmail("");
   setPassword("");
   setfname("");
    setlname("");
  }
  return (
    <div className=" p-7 flex flex-col justify-between h-screen ">
      <div>
      <form action="" onSubmit={(e)=>{submitHandler(e)}}> 
      <img className='w-18 mb-6' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
      <h3 className=" text-lg font-medium mb-1">What's Our Captain's Name</h3>
     <div className="flex gap-4 mb-5">  
    
     <input type="text" 
         value={fname} 
         onChange={(e) =>  setfname(e.target.value)}
        className="bg-[#eeeeee] rounded px-4 py-2  border w-full  text-lg placeholder:text-base  "
         required placeholder="First Name" />
            <input type="text" 
         value={lname} 
         onChange={(e) =>  setlname(e.target.value)}
        className="bg-[#eeeeee] rounded px-4 py-2  border w-full  text-lg placeholder:text-base  "
         required placeholder="Last Name" />
     </div>
        <h3 className=" text-lg font-medium mb-1">What's Our Captain's Email</h3>

        <input type="email" 
         value={email} 
         onChange={(e) =>  setEmail(e.target.value)}
        className="bg-[#eeeeee] rounded px-4 py-2 border w-full  text-lg placeholder:text-base mb-5 "
         required placeholder="abc@mail.com" />

        <h3 className="text-lg font-medium mb-1" >Enter Password</h3>
        <input type="password" value={password} onChange={(e)=>
          {
            setPassword(e.target.value);
          }
        }
        className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-5 "
        required placeholder="Password Here" />

        <button 
        className="bg-black text-white  font-semibold rounded px-4 py-2  w-full text-lg mt-3 mb-2 ">
          Sign Up
          </button>
      <div className="mt">
      <p className="text-center"> Already a Captain ? <Link to="/captain-login" className="text-blue-600"> Login Here </Link> </p>
      </div>
      </form>
      </div>
      <div>
        <p className='text-xs leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy</span> and <span className='text-blue-600'>Terms of Service</span> apply.</p>
     
    </div>
    </div>
   
  );
};

export default captainSignup