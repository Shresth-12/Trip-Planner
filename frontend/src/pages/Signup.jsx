import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
export function Signup() {
    const navigate = useNavigate();
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    async function handleClick(a,b)
{
  try
  {
  const response=await axios.post("https://trip-planner-backend-18rw.onrender.com/api/v1/user/signup",{
    email:a,
    password:b
  })
  navigate("/signin");
  localStorage.setItem('token',response.data.token)

}
catch(err)
{
  console.error(err.message)
}
}
    return (
      <div className="bg-gradient-to-r from-[#6c757d] to-[#495057] h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-80 w-[350px] h-auto text-center border-2 border-transparent shadow-lg rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-6">Signup</h1>
          
          <input
            type="text"
            placeholder="Email"
            className="border border-transparent w-full p-2 rounded-md mb-4 bg-gray-100 focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="border border-transparent w-full p-2 rounded-md mb-4 bg-gray-100 focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <br />
          
          <p className="mt-2 text-gray-600 hover:text-blue-600 cursor-pointer font-bold" onClick={()=>handleClick(email,password)}>Signup</p>
          
          <p className="mt-4">
            Already have an account yet?{" "}
            <span className="hover:text-blue-600 cursor-pointer text-gray-600 font-bold" onClick={()=>{
                navigate("/signin")
            }}>Log in</span>
          </p>
        </div>
      </div>
    );
  }
  
