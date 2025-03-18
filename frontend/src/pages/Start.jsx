import React from 'react'
import { Link } from 'react-router-dom';
const Start = () => {
  return (
    <div className='bg-top bg-cover bg-[url(https://media.istockphoto.com/id/526811099/vector/traffic-lights.jpg?s=612x612&w=0&k=20&c=tPhxqLdoGJ4Wrnj3sUr7a46mIh1lg_Z7Z8qIUXm1rbE=)] pt-8 h-screen w-full flex justify-between flex-col'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white py-4 px-4 pb-7'>
            <h2 className='text-3xl font-bold ml-2 mr-2'>Get Started with Uber</h2>
            <Link to='/login' className='flex items-center justify-center h-10 w-full bg-black text-white py-3 rounded mt-5'>
             Continue 
            </Link>
        </div>
    </div>
  )
}

export default Start

