import { NavBar } from "../components/NavBar"
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const token=localStorage.getItem('token')
  return <div>
   <div>
    <NavBar/>
   </div>
   <div>
    <h1 className='text-7xl font-extrabold mt-28 ml-96 text-[#f56551]'>Your Next Journey?</h1>
    <br />
    <h1 className='text-5xl font-extrabold ml-66'>Personalized Itineraries at Your Fingertips</h1>
    <br />
    <p className='text-2xl mt-8 ml-44 text-gray-500'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
   </div>
   <div className="mt-20 ml-[650px]">
            {!token && <button className="bg-black text-white rounded-l border-2 border-transparent p-2 text-sm cursor-pointer" onClick={()=>{
                navigate("/signup")
            }}>Get Started For Free!</button>}
            {token && <button className="bg-black text-white rounded-l border-2 border-transparent p-2 text-sm cursor-pointer" onClick={()=>{
                navigate("/create")
            }}>Get Started For Free!</button>}
        </div>
  </div>
}

export default Home
