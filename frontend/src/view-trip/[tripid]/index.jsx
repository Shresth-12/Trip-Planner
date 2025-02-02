import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../components/NavBar";
import aiimage from '../../assets/ai.webp';
import { HotelCard } from "../../components/HotelCard";
import { PlaceCard } from "../../components/PlaceCard";
import ClipLoader from "react-spinners/ClipLoader";

export function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrip() {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/trip/get-trip/${tripId}`);
        setTrip(response.data); 
      } catch (err) {
        setError(err.message || "Error fetching trip data");
      } finally {
        setLoading(false);
      }
    }

    fetchTrip();
  }, [tripId]);

  if (loading) return <div className="flex items-center justify-center  h-screen">
  <div> <ClipLoader
  size={70}
  aria-label="Loading Spinner"
  data-testid="loader"
/></div>
</div>
  if (error) return <div>Error: {error}</div>;
  if (!trip) return <div>No trip data found.</div>;

  const days = parseInt(trip.tripDetails.duration, 10);
  let dayElements = [];

  for (let i = 0; i < days; i++) {
    let placeElements = [];
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
      <div key={i} className="mb-6">
        <h2 className="text-xl font-bold mt-2">Day {i + 1}:{trip.itinerary[`day${i + 1}`]?.theme}</h2>
        <p className="text-sm  mt-1 text-red-600">{trip.itinerary[`day${i + 1}`]?.bestTimeToVisit}</p>
        <div className="flex gap-4 flex-wrap">{placeElements}</div>
      </div>
    );
  }

  return (
    <div>
      <div><NavBar /></div>
      <div className="mt-16">
        <img 
          src={aiimage} 
          alt="Travel Image" 
          className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg object-cover h-64"
        />
        <h1 className="ml-72 mt-6 font-bold text-2xl">{trip.tripDetails.location}</h1>
        <div className="ml-72 mt-4 flex gap-4">
          <span>
            <p className="text-gray-600 bg-gray-200 px-4 py-2 rounded-full text-sm">📅 {trip.tripDetails.duration}</p>
          </span>
          <span>
            <p className="text-gray-600 bg-gray-200 px-4 py-2 rounded-full text-sm">💰 {trip.tripDetails.budget}</p>
          </span>
          <span>
            <p className="text-gray-600 bg-gray-200 px-4 py-2 rounded-full text-sm">🥂 {trip.tripDetails.travelers}</p>
          </span>
        </div>
      </div>
      <div className="mt-10 ml-56">
        <h1 className="text-xl font-bold">Hotel Recommendation</h1>
        <div className="flex gap-4 mt-4">
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
      <div className="mt-10 ml-66">
        <h1 className="text-xl font-bold">Places to Visit</h1>
        <div>{dayElements}</div>
      </div>
    </div>
  );
}
