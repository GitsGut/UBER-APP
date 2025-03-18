import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/userContext"; // fixed import path casing

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [error, setError] = useState(null); // Added for error handling

  const navigate = useNavigate();
  const { setuser } = useContext(userDataContext); // fixed context usage

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevents page refresh

    try {
      const newUser = {
        fullName: {
          firstName: fname,
          lastName: lname,
        },
        email,
        password,
      };
      const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000"; 
      const response = await axios.post(
        `${BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setuser(data.user);
        localStorage.setItem('token', data.token);
         // fixed context setter name
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }

    // Clear form fields
    setEmail("");
    setPassword("");
    setFname("");
    setLname("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <form onSubmit={submitHandler}>
          <img
            className="w-16 mb-10"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
          <h3 className="text-lg font-medium mb-1">What's Your Name</h3>
          <div className="flex gap-4 mb-5">
            <input
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              placeholder="First Name"
            />
            <input
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              placeholder="Last Name"
            />
          </div>

          <h3 className="text-lg font-medium mb-1">Email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-5"
            required
            placeholder="abc@mail.com"
          />

          <h3 className="text-lg font-medium mb-1">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-5"
            required
            placeholder="Password Here"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-black text-white font-semibold rounded px-4 py-2 w-full text-lg mt-3 mb-2"
          >
            Create Account
          </button>

          <div className="mt">
            <p className="text-center">
              Already a user?{" "}
              <Link to="/login" className="text-blue-600">
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div>
        <p className="text-xs">
          By proceeding, you consent to get calls, WhatsApp, or SMS/RCS
          messages, including by automated means, from Uber and its affiliates
          to the number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
