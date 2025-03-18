import React, { useEffect , useState ,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from 'axios';

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {captain , setCaptain} = useContext(CaptainDataContext)
  const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
   // Runs only when token changes
  const fetchCaptainData = async()=>{
      try{ 
    const response =   await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,
        {
          headers :{
            Authorization: `Bearer ${token}`
          }
        }
       )
    if(response.status === 200)
    {
      setIsLoading(false);
      setCaptain(response.data.captain)
    }
   }
 catch(error)
 {
  console.log(error);
  localStorage.removeItem('token');
  navigate('/captain-login')
 }};
 fetchCaptainData();
}, [token, navigate, setCaptain]);

 if(isLoading)
 {
  return <div> Loading.... </div>
 }

  return token ? <>{children}</> : null; // Render children only if token exists
};

export default CaptainProtectedWrapper;
