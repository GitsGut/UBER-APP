import React, { useEffect , useContext , useState } from "react";
import { useNavigate } from "react-router-dom";
import {userDataContext} from '../context/userContext'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading , setIsLoading] = useState(true);
  const {user,setuser} = useContext(userDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    };
    const fetchUserData = async()=>
    {  
      try{
         
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers :
            {
              Authorization:`Bearer ${token}`
            }
          }
        );
        if(response.status === 200)
        {
          setIsLoading(false);
          setuser(response.data.user);
        }      
    }
    catch(error)
    {
          console.log(error);
          navigate('/login')
    }};
    fetchUserData();
  }, [token, navigate,setuser]);
  if(isLoading)
    {
     <> Loading...</>
    } // Runs only when token changes

  return token ? <>{children}</> : null; // Render children only if token exists
};

export default UserProtectedWrapper;
