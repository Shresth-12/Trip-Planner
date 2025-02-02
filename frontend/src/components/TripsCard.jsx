import aiimage from "../assets/ai.webp";
import { useNavigate } from "react-router-dom";
export function TripsCard({location,days,budget,trip}) {
    const navigate = useNavigate();
  return (
    <div className="group relative cursor-pointer" onClick={()=>{
     navigate(`/view/${trip}`)
    }}>
      <div className="overflow-hidden rounded-2xl shadow-md transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl">
        <img
          src={aiimage}
          alt="Trip Destination"
          className="rounded-2xl h-48 object-cover transition-all duration-300 group-hover:brightness-90"
        />
      </div>
      <h1 className="mt-2 text-xl font-bold group-hover:text-blue-600 transition-all duration-300">
       {location}
      </h1>
      <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-all duration-300">
        {days} trip with <span className="font-bold">{budget}</span> budget
      </p>
    </div>
  );
}
