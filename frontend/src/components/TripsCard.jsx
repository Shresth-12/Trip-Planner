import aiimage from "../assets/ai.webp";
import { useNavigate } from "react-router-dom";
export function TripsCard({location,days,budget,trip}) {
    const navigate = useNavigate();
  return (
    <article className="group cursor-pointer overflow-hidden rounded-[20px] border border-[#e3e8e2] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_#17212b16]" onClick={()=>{
     navigate(`/view/${trip}`)
    }}>
        <img
          src={aiimage}
          alt="Trip Destination"
          className="block h-[190px] w-full object-cover transition duration-300 group-hover:scale-105"
        />
      <div className="p-[17px_18px_20px]">
        <h2 className="m-0 font-['Space_Grotesk'] text-xl">{location}</h2>
        <p className="m-0 mt-1 text-sm text-[#66727d]">{days} trip <span aria-hidden="true">·</span> <strong>{budget}</strong> budget</p>
      </div>
    </article>
  );
}
