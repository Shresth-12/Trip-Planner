import GeocodingWithCache from "../components/AutoComplete";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "../AI/GoogleAI";
import axios from "axios";
import { TravelLoader } from "../components/TravelLoader";

function Create() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(null);

  const budgetOptions = [
    { id: "cheap", emoji: "💵", label: "Cheap", desc: "Stay conscious of costs" },
    { id: "moderate", emoji: "💰", label: "Moderate", desc: "Keep cost on the average side" },
    { id: "luxury", emoji: "💸", label: "Luxury", desc: "Don't worry about cost" },
  ];

  const companionOptions = [
    { id: "solo", emoji: "✈️", label: "Just Me", desc: "A sole traveler in exploration" },
    { id: "couple", emoji: "🥂", label: "A Couple", desc: "Two travelers in tandem" },
    { id: "family", emoji: "🏡", label: "Family", desc: "A group of fun-loving adventurers" },
    { id: "friends", emoji: "⛵", label: "Friends", desc: "A bunch of thrill-seekers" },
  ];
  const handleGenerateTrip = async () => {
    if (!selectedBudget || !selectedCompanion || !days || !token) {
      toast.error("Please fill in all the required fields!");
      return;
    }
    setLoading(true);
    const prompt = `Generate Travel Plan for Location: ${selectedLocation}, for ${days} Days for ${selectedCompanion} with a ${selectedBudget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.`;
    const result = await chatSession.sendMessage(prompt);
    const uid = localStorage.getItem("userid");
    const response = await axios.post(
      "https://trip-planner-backend-18rw.onrender.com/api/v1/trip/save",
      {
        userId: uid,
        data: result.response.text(),
      }
    );
    const tid = response.data.tripId;
    setLoading(false);
    navigate("/view/" + tid);
  };
  return (
    <div className="min-h-screen bg-[#f7f8f5] text-[#17212b]">
      <NavBar />
      <div className="mx-auto my-[42px] mb-[70px] max-w-[920px] rounded-[26px] border border-[#e3e8e2] bg-white p-[clamp(24px,5vw,52px)] shadow-[0_20px_60px_#17212b0d]">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#17212b22] px-3 py-2 text-[.69rem] font-bold tracking-[.1em]">
          <span className="status-dot" />
          SMART ITINERARY BUILDER
        </div>
        <div className="mt-6 text-[.72rem] font-bold uppercase tracking-[.16em] text-[#e8664f]">Personalise your journey</div>
        <h1 className="m-0 mt-1 font-['Space_Grotesk'] text-[clamp(2rem,5vw,3.5rem)] tracking-[-.05em]">Tell us how you want to travel.</h1>
        <p className="text-[#66727d]">Share a few details and our AI will shape a thoughtful itinerary around your preferences.</p>
        <div className="mt-6 flex gap-2">
          <span className="h-[5px] w-[62px] rounded-full bg-[#e8664f]" />
          <span className={`h-[5px] w-[62px] rounded-full ${selectedLocation ? "bg-[#e8664f]" : "bg-[#e4e8e3]"}`} />
          <span className={`h-[5px] w-[62px] rounded-full ${selectedBudget && selectedCompanion && days ? "bg-[#e8664f]" : "bg-[#e4e8e3]"}`} />
        </div>
        <div className="mt-[34px]">
          <label className="mb-[11px] block font-bold">Where are you going?</label>
          <GeocodingWithCache onSelect={setSelectedLocation} />
        </div>
        <div className="mt-[34px]">
          <label className="mb-[11px] block font-bold">How many days are you planning?</label>
          <input
            type="text"
            placeholder="Ex. 3"
            value={days}
            onChange={(event) => setDays(event.target.value)}
            className="h-12 w-full rounded-xl border border-[#dce1dc] bg-[#fbfcfa] px-[15px] outline-none focus:border-[#e8664f] focus:ring-4 focus:ring-[#e8664f18]"
          />
        </div>
        <div className="form-section">
          <label className="mb-[11px] block font-bold">What is your budget?</label>
          <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
            {budgetOptions.map((option) => (
              <div
                key={option.id}
                className={`min-h-[132px] rounded-2xl border p-[17px] text-left transition hover:-translate-y-[3px] hover:border-[#e8664f] ${selectedBudget === option.id ? "border-[#17212b] bg-[#17212b] text-white" : "border-[#dce1dc] bg-white"}`}
                onClick={() => setSelectedBudget(option.id)}
              >
                <div className="text-[1.7rem]">{option.emoji}</div>
                <div className="mt-2 font-bold">{option.label}</div>
                <small className="mt-1 block leading-[1.35] text-[#66727d]">{option.desc}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="form-section">
          <label className="mb-[11px] block font-bold">Who are you traveling with?</label>
          <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
            {companionOptions.map((option) => (
              <div
                key={option.id}
                className={`min-h-[132px] rounded-2xl border p-[17px] text-left transition hover:-translate-y-[3px] hover:border-[#e8664f] ${selectedCompanion === option.id ? "border-[#17212b] bg-[#17212b] text-white" : "border-[#dce1dc] bg-white"}`}
                onClick={() => setSelectedCompanion(option.id)}
              >
                <div className="text-[1.7rem]">{option.emoji}</div>
                <div className="mt-2 font-bold">{option.label}</div>
                <small className="mt-1 block leading-[1.35] text-[#66727d]">{option.desc}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[35px] flex justify-end">
          {!loading ? (
            <button className="cursor-pointer rounded-full border-0 bg-[#17212b] px-[21px] py-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#e8664f]" onClick={handleGenerateTrip}>
              Generate my trip ↗
            </button>
          ) : (
            <div className="generation-panel">
              <TravelLoader message="" />
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Create;
