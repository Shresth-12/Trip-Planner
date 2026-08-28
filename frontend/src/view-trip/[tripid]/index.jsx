import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../components/NavBar";
import aiimage from '../../assets/ai.webp';
import { HotelCard } from "../../components/HotelCard";
import { PlaceCard } from "../../components/PlaceCard";
import { TravelLoader } from "../../components/TravelLoader";

export function ViewTrip() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrip() {
      try {
        const response = await axios.get(
          `https://trip-planner-backend-18rw.onrender.com/api/v1/trip/get-trip/${tripId}`
        );
        setTrip(response.data);
      } catch (err) {
        setError(err.message || "Error fetching trip data");
      } finally {
        setLoading(false);
      }
    }

    fetchTrip();
  }, [tripId]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f8f5]">
        <TravelLoader message="Mapping your adventure..." />
      </div>
    );
  }

  if (error) {
    return <div className="mx-auto w-[min(1160px,calc(100%-40px))] py-[72px]">Error: {error}</div>;
  }

  if (!trip) {
    return <div className="mx-auto w-[min(1160px,calc(100%-40px))] py-[72px]">No trip data found.</div>;
  }

  const days = parseInt(trip.tripDetails.duration, 10);
  let dayElements = [];

  for (let i = 0; i < days; i++) {
    const placeElements = [];
    const places = trip.itinerary[`day${i + 1}`]?.places;
    
    if (places) {
      for (let j = 0; j < places.length; j++) {
        const place = places[j];
        placeElements.push(
          <PlaceCard
            key={place.id}
            title={place.placeName}
            description={place.placeDetails}
            walk={place.timeTravel}
            price={place.ticketPricing}
          />
        );
      }
    }
    dayElements.push(
      <div key={i} className="mt-8 border-t border-[#e3e8e2] pt-6">
        <div className="flex items-baseline justify-between gap-3 max-sm:block">
          <h3 className="font-['Space_Grotesk'] text-xl">
            Day {i + 1}: {trip.itinerary[`day${i + 1}`]?.theme}
          </h3>
          <p className="text-[.72rem] font-bold uppercase tracking-[.16em] text-[#e8664f]">
            {trip.itinerary[`day${i + 1}`]?.bestTimeToVisit}
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 max-md:grid-cols-1">{placeElements}</div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <main className="mx-auto w-[min(1160px,calc(100%-40px))] py-12">
        <button
          className="cursor-pointer  mb-5 rounded-full border border-[#dce1dc] bg-white px-[18px] py-[11px] font-bold text-[#17212b] transition duration-200 hover:-translate-y-0.5 hover:border-[#e8664f]"
          onClick={() => navigate("/trips")}
        >
          ← Back to my trips
        </button>
        <div className="relative h-[300px] overflow-hidden rounded-[26px] bg-[#17212b]">
          <img className="h-full w-full object-cover opacity-80" src={aiimage} alt="Travel Image" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17212bdd] to-transparent p-8 text-white">
            <h1 className="m-0 mb-3 font-['Space_Grotesk'] text-[clamp(2rem,5vw,3.8rem)] tracking-[-.05em]">{trip.tripDetails.location}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-white/15 px-3 py-2 text-xs">📅 {trip.tripDetails.duration}</span>
              <span className="rounded-full bg-white/15 px-3 py-2 text-xs">💰 {trip.tripDetails.budget}</span>
              <span className="rounded-full bg-white/15 px-3 py-2 text-xs">🥂 {trip.tripDetails.travelers}</span>
            </div>
          </div>
        </div>
        <div className="mt-11">
          <h2 className="font-['Space_Grotesk'] text-3xl">Stay somewhere lovely</h2>
          <div className="mt-5 grid grid-cols-3 gap-[18px] max-md:grid-cols-1">
          {trip.hotelOptions.map((hotel, index) => (
            <HotelCard
              key={index}
              name={hotel.hotelName}
              location={hotel.hotelAddress}
              budget={hotel.price}
              rating={hotel.rating}
            />
          ))}
        </div>
      </div>
        <div className="mt-11">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#17212b22] px-3 py-2 text-[.69rem] font-bold tracking-[.1em]">
            <span className="status-dot" />
            ITINERARY READY
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl">Your itinerary</h2>
        <div>{dayElements}</div>
      </div>
      </main>
    </div>
  );
}
