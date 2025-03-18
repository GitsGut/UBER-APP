import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 const userLogout = () => {
    const navigate = useNavigate();
    useEffect(() => {

      const logout = async()=>{
        try {
          const token = localStorage.getItem('token');
          const response =  await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
              headers: {
            Authorization: `Bearer ${token}`
          },   
        })
          if(response.status === 200)
          {
              localStorage.removeItem('token');
              navigate('/login');
              
          }} 
        
        catch(error){
            console.error('Logout Error:', error);
        }
      };
     logout();
    }, [navigate]);
    
    return <div>Logging out...</div>
};
export default userLogout;

