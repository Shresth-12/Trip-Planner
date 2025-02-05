import GeocodingWithCache from "../components/AutoComplete";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "../AI/GoogleAI";
import {ClipLoader} from "react-spinners"
import axios from "axios";

function Create() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [selectedLocation, setSelectedLocation] = useState('');
  const [destination,setDestination]=useState("")
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [days, setDays] = useState("");
  const [loading,setLoading]=useState(null)

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
    setLoading(true)
    const prompt=`Generate Travel Plan for Location: ${selectedLocation}, for ${days} Days for ${selectedCompanion} with a ${selectedBudget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.`
    const result=await chatSession.sendMessage(prompt)
    const uid=localStorage.getItem('userid')
    const p=await axios.post("https://trip-planner-backend-18rw.onrender.com/api/v1/trip/save",{
      userId:uid,
      data:result.response.text()
    })
    const tid=p.data.tripId
    setLoading(false)
    navigate("/view/"+tid)
  };
  return (
    <div>
      <NavBar />
      <div>
        <br />
        <h1 className="text-3xl font-extrabold ml-66">Tell us your travel preferences 🏕️🌴</h1>
        <br />
        <p className="text-xl ml-68 text-gray-500">
          Just provide some basic information, and our trip planner will generate a customized itinerary based <br />
          on your preferences.
        </p>
      </div>
      <div className="mt-20 ml-66">
        <h1 className="text-xl font-medium">What is destination of choice?</h1>
        <br />
        <GeocodingWithCache onSelect={setSelectedLocation}/>
      </div>
      <div className="mt-10 ml-66">
        <h1 className="text-xl font-medium">How many days are you planning your trip?</h1>
        <br />
        <input
          type="text"
          placeholder="Ex. 3"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="border-2 border-gray-200 w-[900px] h-[38px] rounded-l p-2"
        />
      </div>
      <div className="mt-10 ml-66">
        <h1 className="text-xl font-medium">What is Your Budget?</h1>
        <div className="grid grid-cols-3 mx-70 mt-5 -ml-2">
          {budgetOptions.map((option) => (
            <div
              key={option.id}
              className={`p-2 border cursor-pointer rounded-lg hover:shadow-lg border-black w-72 transition-all duration-300 ${
                selectedBudget === option.id ? "bg-black text-white" : "bg-white"
              } mt-4`}
              onClick={() => setSelectedBudget(option.id)}
            >
              <h2 className="text-4xl">{option.emoji}</h2>
              <h2 className="font-bold text-lg">{option.label}</h2>
              <h2 className="text-sm text-gray-500">{option.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 ml-66">
        <h1 className="text-xl font-medium">Who do you plan on traveling with on your next adventure?</h1>
        <div className="grid grid-cols-3 mx-70 mt-5 -ml-2">
          {companionOptions.map((option) => (
            <div
              key={option.id}
              className={`p-2 border cursor-pointer rounded-lg hover:shadow-lg border-black w-72 transition-all duration-300 ${
                selectedCompanion === option.id ? "bg-black text-white" : "bg-white"
              } mt-4`}
              onClick={() => setSelectedCompanion(option.id)}
            >
              <h2 className="text-4xl">{option.emoji}</h2>
              <h2 className="font-bold text-lg">{option.label}</h2>
              <h2 className="text-sm text-gray-500">{option.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      {!loading && <button
        className="bg-black text-white rounded-2xl border-2 border-transparent p-2 text-sm cursor-pointer mt-10 ml-[1100px] mb-4"
        onClick={handleGenerateTrip}
      >
        Generate Trip
      </button>}
      {loading && <button
        className="bg-black text-white rounded-2xl border-2 border-transparent p-2 text-sm cursor-pointer mt-10 ml-[1100px] mb-4"
      >
       <ClipLoader color="#ffffff" />
      </button>}

      <ToastContainer />
    </div>
  );
}

export default Create;
